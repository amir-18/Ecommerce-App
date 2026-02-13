import productModel from './productModel.js';

export const createProduct = async (productData) => {
    const product = await productModel.create(productData);
    if(!product){
        throw new Error('Product Cant Be Created');
    }
     res.status(201).json({
            success : true,
            data : product,
            message : 'Product Created Successfully'
        });
};