import express from 'express';
import { placeOrder, getOrderId, getOrdersUserId } from '../controllers/order.controller.js';

const router = express.Router();

router.post('/', placeOrder);
router.get('/:id', getOrderId);
router.get('/user/:userId', getOrdersUserId);

export { router as orderRouter };