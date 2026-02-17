import express from 'express';
import jwt from 'jsonwebtoken';
import { addToCart, removeFromCart } from './cartService.js';

export  const  addToCartController =  async (req,res,next) => {
    const token = req.cookies.token;
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    const userdata = decoded._id;
    const product = req.params.productid;
    const quantity = req.body.quantity;
    
    try{
        const Cart = await addToCart(userdata,product,quantity);
        res.status(201).json({
            success : true,
            message : 'Product Added To Cart Successfully',
            data : Cart
        })
    }
    catch(error){
        next(error);
    }


};

export const removeCartController = async (req,res,next) => {
    const token = req.cookies.token;
    const decoded = jwt.verify(token,process.env.JWT_SECRET);

    try{
    const userid = decoded._id;
    const productid = req.params.productid;
    const removedProduct = await removeFromCart(productid,userid);
    res.status(201).json({
        success : true,
        message : 'Product Removed From Cart Successfully',
        data : removedProduct
    });
    }
    catch(error){
        next(error);
    }
   
}