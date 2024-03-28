import mongoose from "mongoose";
import User from "./user.model.js";
import Product from "./product.model.js";

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true },
    items: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: Product, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
    }],
    total: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'confirmed', 'shipped', 'delivered'], default: 'pending' },
    createdAt: { type: Date, default: Date.now }
})

const Order = mongoose.model('Order', orderSchema);

export default Order;