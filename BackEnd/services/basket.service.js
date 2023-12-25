import User from '../models/user.model.js';
import Product from '../models/product.model.js';

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

        return user.basket;
    } catch (error) {
        throw error;
    }
};
