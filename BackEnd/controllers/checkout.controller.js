import Stripe from 'stripe';
import { config } from "dotenv";
import { removeAllBasketItems } from '../services/basket.service.js';

config({ path: `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ''}` });


const stripeKey = process.env.STRIPE_SECRET_KEY;
const stripeAPI = new Stripe(stripeKey);

export const createCheckoutSession = async (req, res) => {
    console.log('Received request body:', req.body.items);
    const domainURL = process.env.WEB_APP_URL;

    try {
        const session = await stripeAPI.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: req.body.items.map(item => {
                return {
                    price_data: {
                        currency: 'gbp',
                        product_data: {
                            name: item.name,
                            images: [item.image],
                        },
                        unit_amount: Math.round(item.price * 100),
                    },
                    quantity: item.quantity
                }
            }),
            success_url: `${domainURL}/success`,
            cancel_url: `${domainURL}/canceled`,
            shipping_address_collection: { allowed_countries: ['GB'] },
        });

        await removeAllBasketItems(req.body.userId);

        res.json({ url: session.url });
    } catch (error) {
        console.error('An error occurred while creating the session:', error.message);
        res.status(400).json({ error: 'An error occurred so we are unable to create the session' })
    }
}