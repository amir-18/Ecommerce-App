import createCheckoutSession from "./paymentService";
import express from 'express';

export const checkoutController = async (req,res) => {
    const productdata = req.body;
    const userdata = req.user._id;

    const session = await createCheckoutSession(productdata,userdata);
    res.json({ sessionId: session.id });
}