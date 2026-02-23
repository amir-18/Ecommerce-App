import {createCheckoutSession, createCartCheckoutSession} from "./paymentService.js";
import express from 'express';
import stripe from 'stripe';


const stripe = new stripe(process.env.STRIPE_SECRET_KEY);

export const checkoutController = async (req,res) => {
    const productid = req.params.productid;
    const userdata = req.user._id;

    const session = await createCheckoutSession(productid,userdata);
    if(!session){
        return res.status(500).json({ error: 'Failed to create checkout session' });
    }
    res.json({ sessionurl: session.url });
};

export const cartCheckoutController = async (req,res) => {
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

}

export const stripeWebhook = async (req,res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try{
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            STRIPE_WEBHOOK_SECRET
        );
    }
    catch(err){
        next(err);
    }

    if(event == 'checkout.session.completed'){
        session = event.data.object;

        const {type,userId,productId} = session.metadata;
        try{
            if(type == 'cart'){
                const cart = await cart.findByIdAndUpdate({userid : userId}, {$set : {items : []}});
                console.log("Users Cart Emptied Successfully");
            }
            if(type == 'single_product'){
                console.log('Bought Successfuly');
            }

            const Order =
        }
       


    }
}