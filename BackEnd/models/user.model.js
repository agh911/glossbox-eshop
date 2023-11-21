import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
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

// // Hash the password before saving it to the database
// userSchema.pre('save', async function (next) {
//     try {
//         const salt = await bcrypt.genSalt(10);
//         this.password = await bcrypt.hash(this.password, salt);
//         next();
//     } catch (error) {
//         next(error);
//     }
// });

// // Generate a JWT for the user
// userSchema.methods.generateAuthToken = function () {
//     return jwt.sign(
//         { userId: this._id, email: this.email },
//         process.env.SECRET_KEY,
//         { expiresIn: '1h' }
//     );
// };

const User = mongoose.model('User', userSchema);

export default User;
