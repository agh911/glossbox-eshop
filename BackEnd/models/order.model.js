import mongoose from 'mongoose';
import User from './user.model';
import Product from './product.model';

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true,
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: Product,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
            },
        },
    ],
    total: {
        type: Number,
        required: true,
    },
    paymentStatus: {
        type: String,
        default: 'Pending',
    },
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
