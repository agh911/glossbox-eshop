import Order from '../models/order.model.js';

export const createOrder = async (userId, orderDetails) => {
    try {
        orderDetails.userId = userId;
        const order = new Order(orderDetails);
        await order.save();
        return order;
    } catch (error) {
        throw error;
    }
};
