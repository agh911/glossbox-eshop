import User from '../models/user.model.js';
import Product from '../models/product.model.js';
import { io } from '../server.js';

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

        await user.save();

        io.emit('itemAdded', { userId, productId, quantity });

        return user.basket;
    } catch (error) {
        throw error;
    }
};

export const updateBasketItemQuantity = async (userId, productId, quantity) => {
    try {
        const user = await User.findById(userId);

        if (!user) {
            throw new Error('User not found');
        }

        const product = await Product.findById(productId);

        if (!product) {
            throw new Error('Product not found');
        }

        const existingItem = user.basket.items.find(
            (item) => item.product.toString() === productId
        );

        if (!existingItem) {
            throw new Error('Item not found in basket');
        }

        existingItem.quantity = quantity;

        await user.save();

        io.emit('itemQuantityUpdated', { userId, productId, quantity });

        return user.basket;
    } catch (error) {
        throw error;
    }
};

export const removeFromBasket = async (userId, productId) => {
    try {
        const user = await User.findById(userId);

        if (!user) {
            throw new Error('User not found');
        }

        user.basket.items = user.basket.items.filter(
            (item) => item.product.toString() !== productId
        );

        await user.save();

        io.emit('itemRemoved', { userId, productId });

        return user.basket;
    } catch (error) {
        throw error;
    }
};

export const removeAllBasketItems = async (userId) => {
    try {
        const user = await User.findById(userId);

        if (!user) {
            throw new Error('User not found');
        }

        user.basket.items = [];

        await user.save();

        io.emit('allItemsRemoved', { userId });

        return user.basket;
    } catch (error) {
        throw error;
    }
};
