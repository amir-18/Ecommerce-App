import express from 'express';
import { createProduct,deleteProduct } from './productService.js';

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

export const deleteProductController = async (req,res,next) => {
    try{
        const productId = req.params.productid;
        const deletedProduct = await deleteProduct(productId);
        res.status(201).json({
            success : true,
            message : `${deletedProduct.name} has been deleted `
        });
    }
    catch(error){
        next(error);
    }
}