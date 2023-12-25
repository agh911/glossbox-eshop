import express from 'express';
import { addToBasketController } from '../controllers/basket.controller.js';

const router = express.Router();

router.post('/', addToBasketController);

export { router as addToBasketRoute };