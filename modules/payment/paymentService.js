import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (productdata, userid) => {
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

export default createCheckoutSession;