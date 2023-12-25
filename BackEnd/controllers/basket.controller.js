import { addToBasket } from '../services/basket.service.js';

export const addToBasketController = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        const basket = await addToBasket(userId, productId, quantity);

        res.status(200).json({ success: true, basket });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
