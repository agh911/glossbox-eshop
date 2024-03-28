import express from 'express';
import { createOrder } from '../services/order.service';

const router = express.Router();

router.post('/', createOrder);
router.get('/:id', protect, getOrderById);
router.get('/user/:userId', protect, getOrdersByUserId);

export { router as orderRouter };