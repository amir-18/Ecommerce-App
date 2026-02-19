import Stripe from 'stripe';
import productModel from '../product/productModel.js';
import cartModel from '../cart/cartModel.js';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (productid, userid) => {

    const productdata = await productModel.findById(productid);
    // Ensure price exists, otherwise default to 0 to avoid NaN
    const priceInCents = Math.round((productdata.price || 0) * 100);

    return await stripe.checkout.sessions.create({
        mode: 'payment',
        payment_method_types: ['card'],
        // FIXED: Stripe REQUIRES https://
        success_url: 'https://google.com', 
        cancel_url: 'https://google.com',
        // FIXED: Key must be 'metadata', NOT 'meta_data'
        metadata: {
            userId: userid.toString(),
            productId: productdata._id?.toString()
        },
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: productdata.name,
                        description: productdata.description,
                        images: productdata.images // Optional: shows the pic on Stripe page
                    },
                    unit_amount: priceInCents, 
                },
                quantity: 1
            }
        ]
    });
};

export const createCartCheckoutSession = async (userid) => {
    const cartItems = await cartModel.find({user : userid});
    const line_items = cartItems.map(item => ({
       price_data: {
        currency: 'usd',
        product_data: {
            name: item.name,
            images: [item.image], 
            description: item.description,
        },
        // Standardize to cents
        unit_amount: Math.round(item.price * 100), 
    },
    quantity: item.quantity,
    }));

    return await stripe.checkout.sessions.create({
        mode : 'payment',
        payment_method_types : ['card'],
        metadata : {
            userId : userid,
            cartId : cartItems._id
        },
        success_url : 'https://google.com',
        cancel_url : 'https://youtube.com',
        line_items : line_items
    });
}