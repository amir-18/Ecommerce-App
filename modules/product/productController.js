import express from 'express';
import { createProduct,deleteProduct,updateProduct } from './productService.js';

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
};

export const updateProductController = async (req,res,next) => {
    try{
        const productId = req.params.productid;
        const productData = req.body;
        const product = await updateProduct(productId,productData);
        res.status(201).json({
            success : true,
            message : `${product.name} Has Been Updated Successfully`
        });
    }
    catch(error){
        next(error);
    }
}