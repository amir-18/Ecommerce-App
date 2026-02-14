import express from 'express';
import { createProduct } from './productService.js';

export const createProductController = async (req,res,next) => {    
    try{
        const product = await createProduct(req.body);
        res.status(201).json({
            success : true,
            data : product,
            message : 'Product Created Successfully',
        })
        console.log(`Product Created: ${product.name}`);
    }
    catch(error){
        next(error);
    }
};