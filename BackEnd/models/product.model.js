import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: String,
    price: Number,
    categories: [String],
    brand: String,
    imageUrl: String,
    stock: Number,
    reviews: [
        {
            username: String,
            rating: Number,
            comment: String,
        },
    ],
});

const Product = mongoose.model('Product', productSchema);

export default Product;