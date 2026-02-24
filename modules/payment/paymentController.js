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


export const stripeWebhook = async (req,res,next) => {
    const signature = req.headers['stripe-signature'];
    let event = null;
    try{
         event = stripe.webhooks.constructEvent(
            req.body,signature,process.env.STRIPE_WEBHOOK_SECRET
        );
    }
    catch(error){
        error.message = 'Invalid Signature';
        next(error);
    }

      if(event.type == 'checkout.session.completed'){
            const session = event.data.object
            if(session.payment_status == 'unpaid'){
                return console.log('Payment Not Cleared');
            }
             const {type,productId,userId} = session.metadata;
             const shipping = session.shipping;
            const shippingString = `${shipping.name}, ${shipping.address.line1}${shipping.address.line2 ? ', ' + shipping.address.line2 : ''}, ${shipping.address.city}, ${shipping.address.state}, ${shipping.address.postal_code}, ${shipping.address.country}`;
            let orderItems = [];

            if(type == 'cart_checkout'){
                const cartItems = await cartModel.find({user : userId}).populate('items.product');
                 orderItems = cartItems.map(item => ({
                    product: item.items.product._id,
                    quantity: item.items.quantity
                    ,price: item.items.product.price}));

            }

        

        else if (type == 'single_checkout'){
            const product = await productModel.findById(productId);
           orderItems = [{
    product: product._id,
    quantity: 1,
    price: product.price
}]
        
        }

            const order = await orderModel.create({
                stripe_id : session.id,
                user : userId,
                items : orderItems,
                totalPrice : session.amount_total / 100,
                shippingAddress : shippingString,
                status : 'paid',
                payment_method : session.payment_method_types
            })

            res.status(201).json({
                success : true,
                message : 'Order Has Been Created',
                data : order
            })

        }
        else{
            res.status(201).json({
                success : false,
                message : 'Checkout Failed',
            })
        }
}

