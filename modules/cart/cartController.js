import express from 'express';
import { addToCart } from './cartService';

export  const  addToCartController =  async (req,res,next) => {
    const userdata = req.cookies.token.user._id;
    const product = req.params.productid;
    const quantity = req.body.quantity;
    
    try{
        const Cart = await addToCart(userdata,product,quantity);
        res.status(201).json({
            success : true,
            message : 'Product Created Successfully'
        })
    }
    catch(error){
        next(error);
    }


}