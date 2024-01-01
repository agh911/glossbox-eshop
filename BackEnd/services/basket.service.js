import User from '../models/user.model.js';
import Product from '../models/product.model.js';
import Stripe from 'stripe';
import 'dotenv';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2020-08-27' });

export const addToBasket = async (userId, productId, quantity) => {
    try {
        const user = await User.findById(userId);

        if (!user) {
            throw new Error('User not found');
        }

        const product = await Product.findById(productId);

        if (!product) {
            throw new Error('Product not found');
        }

        const existingItemIndex = user.basket.items.findIndex(
            (item) => item.product.toString() === productId
        );

        if (existingItemIndex !== -1) {
            // If the product is already in the basket, update the quantity
            user.basket.items[existingItemIndex].quantity += quantity;
        } else {
            // If the product is not in the basket, add a new item
            user.basket.items.push({
                product: productId,
                quantity: quantity,
            });
        }

        user.basket.total = user.basket.items.reduce(
            (total, item) =>
                total + item.quantity * product.price,
            0
        );

        await user.save();

        return user.basket;
    } catch (error) {
        throw error;
    }
};

export const completePurchase = async (userId) => {
    try {
        const user = await User.findById(userId);

        if (!user) {
            throw new Error('User not found');
        }

        // Calculate the total and other necessary order details
        const orderDetails = {
            items: user.basket.items,
            total: user.basket.total,
        };

        // Use the test payment method for mock payments
        const paymentIntent = await stripe.paymentIntents.create({
            amount: orderDetails.total * 100, // Convert to pence
            currency: 'gbp',
            payment_method: 'pm_card_visa',
            confirm: true,
        });

        // If payment is successful, create the order
        const order = await createOrder(userId, orderDetails);

        // Clear the basket after a successful purchase
        user.basket.items = [];
        user.basket.total = 0;
        await user.save();

        return order;
    } catch (error) {
        throw error;
    }
};