import express from 'express';
import { addToBasketController, updateBasketItemQuantityController, removeFromBasketController } from '../controllers/basket.controller.js';

const router = express.Router();

router.post('/', addToBasketController);
router.put('/:userId/:productId', updateBasketItemQuantityController);
router.delete('/:userId/:productId', removeFromBasketController);

export { router as addToBasketRoute };