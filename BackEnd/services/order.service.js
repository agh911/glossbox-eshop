import Order from "../models/order.model.js";

export const createOrder = async (userId, total, items) => {
    try {
        const order = new Order({
            userId,
            total,
            items,
            status: 'pending'
        });
        return await order.save();
    } catch (error) {
        throw error;
    }
};

export const getOrderById = async (orderId) => {
    try {
        return await Order.findById(orderId);
    } catch (error) {
        throw error;
    }
};

export const getOrdersByUserId = async (userId) => {
    try {
        const orders = await Order.find({ userId });
        return orders;
    } catch (error) {
        throw error;
    }
};