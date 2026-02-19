import createCheckoutSession from "./paymentService.js";
import express from 'express';

export const checkoutController = async (req,res) => {
    const productid = req.params.productid;
    const userdata = req.user._id;

    const session = await createCheckoutSession(productid,userdata);
    if(!session){
        return res.status(500).json({ error: 'Failed to create checkout session' });
    }
    res.json({ sessionurl: session.url });
}