import productModel from './productModel.js';

export const createProduct = async (productData) => {
    const product = await productModel.create(productData);
    if(!product){
        throw new Error('Product Cant Be Created');
    }
    return product;
};

export const deleteProduct = async (productId) => {
    const deletedProduct = await productModel.findByIdAndDelete(productId);
    if(!deletedProduct){
        throw new Error('Product Cant Be Deleted');
    }
    return deletedProduct;
};

export const updateProduct = async(productId,productData) => {
    const updatedProduct = await productModel.findOneAndUpdate({_id : productId}, productData,{new:true});
    if(!updatedProduct){
        throw new Error('Product Cant Be Updated');
    }
    return updatedProduct;
}