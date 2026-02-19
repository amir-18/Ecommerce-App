import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (productdata,userid) => {
    return await stripe.checkout.sessions.create({
        mode : 'payment',
        payment_method_types : ['card'],
        success_url : 'google.com',
        cancel_url : 'google.com',
        meta_data : {
            userId : userid,
            productId : productdata._id.toString()
        },
        line_items : [
            {
                price_data : {
                    currency : 'usd',
                    product_data : {
                        name : productdata.name,
                        description : productdata.description
                    },
                    unit_amount :Math.round(productdata.price * 100),
                },
                quantity : 1
            }
        ]
    })
}; 

export default createCheckoutSession;