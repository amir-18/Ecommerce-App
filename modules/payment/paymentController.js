import {createCheckoutSession, createCartCheckoutSession} from "./paymentService.js";
import express from 'express';
import cartModel from '../cart/cartModel.js';
import productModel from '../product/productModel.js';
import orderModel from '../order/orderModel.js';
import Stripe from 'stripe';


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const checkoutController = async (req,res) => {
    const productid = req.params.productid;
    const userdata = req.user._id;

    const session = await createCheckoutSession(productid,userdata);
    if(!session){
        return res.status(500).json({ error: 'Failed to create checkout session' });
    }
    res.json({ sessionurl: session.url });
};

export const cartCheckoutController = async (req,res,) => {
    const userid = req.user._id;
    const cartSession = await createCartCheckoutSession(userid);

    if(!cartSession){
        return res.status(500).json({
            success : false,
            message : 'Checkout Failed'
        })
        }

        res.status(400).json({
            success : true,
            message : 'Checkout Session Created',
            data : `${cartSession.url}`
        })

};



export const stripeWebhook = async (req, res) => {
  const signature = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.log("Signature verification failed:", error.message);
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  if (event.type !== 'checkout.session.completed') {
    return res.status(200).send('Event ignored');
  }

  try {
    const session = event.data.object;

    if (session.payment_status !== 'paid') {
      return console.log('Payment Not Cleared')
    }

    const existingOrder = await orderModel.findOne({ stripe_id: session.id });
    if (existingOrder) {
      return res.status(200).send('Already processed');
    }

    const metadata = session.metadata || {};
    const { type, productId, userId } = metadata;
    if (!userId || !type) return res.status(400).send('Missing metadata');

    // Safe shipping
    const shipping = session.shipping || {};
    const address = shipping.address || {};
    const shippingString = shipping.name
      ? `${shipping.name}, ${address.line1 || ''}${address.line2 ? ', ' + address.line2 : ''}, ${address.city || ''}, ${address.state || ''}, ${address.postal_code || ''}, ${address.country || ''}`
      : 'No shipping provided';

    let orderItems = [];

    if (type === 'cart_checkout') {
      // FIND cart AND POPULATE product
      const cart = await cartModel
        .findOne({ user: userId })
        .populate('items.product');

      if (!cart || cart.items.length === 0) return res.status(400).send('Cart empty');

      orderItems = cart.items.map(item => ({
        product: item.product._id, // populated, so we can safely access _id, price, name...
        quantity: item.quantity,
        price: item.product.price
      }));

      // Clear cart
      cart.items = [];
      await cart.save();
    }

    else if (type === 'single_checkout') {
      const product = await productModel.findById(productId);
      if (!product) return res.status(400).send('Product not found');

      orderItems = [{
        product: product._id,
        quantity: 1,
        price: product.price
      }];
    }

    else return res.status(400).send('Invalid checkout type');

    // Calculate total
    const totalPrice = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Create order
    const order = await orderModel.create({
      stripe_id: session.id,
      user: userId,
      items: orderItems,
      totalPrice,
      shippingAddress: shippingString,
      status: 'paid',
      payment_method: 'card'
    });

    return res.status(200).json({
      success: true,
      message: 'Order created successfully',
      data: order
    });

  } catch (error) {
    console.log("Webhook processing error:", error);
    return res.status(500).send('Internal Server Error');
  }
};

