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
            type : 'single_checkout',
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
        ],
        shipping_address_collection: {
    allowed_countries: ['US', 'PK'] // whatever countries you allow
},
        shipping_options: [
    {
        shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
                amount: 500, // in cents (5.00 USD)
                currency: 'usd'
            },
            display_name: 'Standard Shipping',
            delivery_estimate: {
                minimum: { unit: 'business_day', value: 3 },
                maximum: { unit: 'business_day', value: 5 }
            }
        }
    }
]
    });
};

export const createCartCheckoutSession = async (userid) => {

    const cart = await cartModel.findOne({ user: userid }).populate('items.product');

    if (!cart || cart.items.length === 0) {
        throw new Error("Cart is empty");
    }

    const lineitems = cart.items.map(item => {
        if (!item.product || !item.product.name) {
            console.error("Product details missing for ID:", item.product);
            return null;
        }

        return {
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.product.name, // 
                    images: [item.product.image], 
                    description: item.product.description,
                },
            
                unit_amount: Math.round(item.product.price * 100), 
            },
            quantity: item.quantity,
        };
    }).filter(i => i !== null); // Remove broken items

    return await stripe.checkout.sessions.create({
        mode: 'payment',
        payment_method_types: ['card'],
        metadata: {  type : 'cart_checkout' , userId: userid.toString() },
        success_url: 'https://google.com',
        cancel_url: 'https://youtube.com',
        line_items: lineitems,
        shipping_address_collection: {
    allowed_countries: ['US', 'PK'] // whatever countries you allow
},
        shipping_options: [
    {
        shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: {
                amount: 500, // in cents (5.00 USD)
                currency: 'usd'
            },
            display_name: 'Standard Shipping',
            delivery_estimate: {
                minimum: { unit: 'business_day', value: 3 },
                maximum: { unit: 'business_day', value: 5 }
            }
        }
    }
]
    });
}