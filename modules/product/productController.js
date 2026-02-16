import express from 'express';
import { createProduct } from './productService.js';

export const createProductController = async (req,res,next) => {    
    try{
        const product = await createProduct(req.body);
        res.status(201).json({
            success : true,
            data : product,
            message : 'Product Created Successfully',
        })    }
    catch(error){
        next(error);
    }
};