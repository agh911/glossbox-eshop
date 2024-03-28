import { addToBasket, updateBasketItemQuantity, removeFromBasket } from '../services/basket.service.js';

export const addToBasketController = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        const basket = await addToBasket(userId, productId, quantity);

        res.status(200).json({ success: true, basket });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export const updateBasketItemQuantityController = async (req, res) => {
    try {
        const { userId, productId } = req.params;
        const { quantity } = req.body;

        const basket = await updateBasketItemQuantity(userId, productId, quantity);

        res.status(200).json({ success: true, basket });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export const removeFromBasketController = async (req, res) => {
    try {
        const { userId, productId } = req.params;

        const basket = await removeFromBasket(userId, productId);

        res.status(200).json({ success: true, basket });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};