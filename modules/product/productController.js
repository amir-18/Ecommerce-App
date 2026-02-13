import express from 'express';
import { createProduct } from './productService';

export const createProductController = (req,res,next) => {    
    try{
        const product = createProduct(req.body);
        res.status(201).json({
            success : true,
            data : product,
            message : 'Product Created Successfully',
        })
    }
    catch(error){
        next(error);
    }
};