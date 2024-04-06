import Product from "../models/product.model.js";

export const getProductDataService = async () => {
    try {
        const products = await Product.find({});
        return products;
    } catch (error) {
        console.error("Error in getProductDataService:", error);
        throw error;
    }
}

export const getSingleProductDataService = async (productId) => {
    try {
        return await Product.findById(productId);
    } catch (error) {
        console.error("Error in getSingleProductDataService:", error);
        throw error;
    }
}