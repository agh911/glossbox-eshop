import mongoose from 'mongoose';
import Product from './product.model.js';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    basket: {
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
            default: 0,
        },
    },
});

const User = mongoose.model('User', userSchema);

export default User;
