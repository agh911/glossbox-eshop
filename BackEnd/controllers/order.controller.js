import { createOrder, getOrderById, getOrdersByUserId } from "../services/order.service.js";

export const placeOrder = async (req, res) => {
    try {
        const { userId, items, total } = req.body;
        const order = await createOrder(userId, total, items);
        res.status(201).json({ success: true, order });
    } catch (error) {
        console.error('Error placing order:', error.message);
        res.status(500).json({ success: false, error: error.message });
    }
};

export const getOrderById = async (req, res) => {
    try {
        const orderId = req.params.id;
        const order = await getOrderById(orderId);
        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }
        res.status(200).json({ success: true, order });
    } catch (error) {
        console.error('Error fetching order by ID:', error.message);
        res.status(500).json({ success: false, error: error.message });
    }
};

export const getOrdersByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;
        const orders = await getOrdersByUserId(userId);
        res.status(200).json({ success: true, orders });
    } catch (error) {
        console.error('Error fetching orders by user ID:', error.message);
        res.status(500).json({ success: false, error: error.message });
    }
};