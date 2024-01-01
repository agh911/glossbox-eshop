import express from 'express';
import { addToBasketController, completePurchaseController } from '../controllers/basket.controller.js';

const addToBasketRoute = express.Router();
addToBasketRoute.post('/', addToBasketController);

const completePurchaseRoute = express.Router();
completePurchaseRoute.post('/completePurchase', completePurchaseController);

export { addToBasketRoute, completePurchaseRoute };
