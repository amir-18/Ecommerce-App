import express from 'express';
import jwt from 'jsonwebtoken';
import { addToCart, removeFromCart , getCartItems } from './cartService.js';

export  const  addToCartController =  async (req,res,next) => {
    const token = req.user._id;
    const userdata = token;
    const product = req.params.productid;
    const quantity = req.body.quantity || 1; 
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
    const token = req.user

    try{
    const userid = token._id;
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

export const showItemsController = async (req,res,next) => {
    try{
        const userid = req.user._id;
        const cartItems = await getCartItems(userid);
        if(!cartItems  || cartItems.length < 1 ){
            return res.status(201).json({
                success : true,
                message : 'Your Cart is Empty'
            })
        }
        res.status(200).json({
            success : true,
            message : 'Here Are Your Cart Items',
            data : cartItems
        })
    }
    catch(error){
        next(error);
    }
}