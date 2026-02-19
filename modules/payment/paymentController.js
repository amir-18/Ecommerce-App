import {createCheckoutSession, createCartCheckoutSession} from "./paymentService.js";
import express from 'express';

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
    const userid = req.user_id;
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