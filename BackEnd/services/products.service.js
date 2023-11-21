import Product from "../models/product.model.js";

export const getProductDataService = async () => {
    try {
        const products = await Product.find({});
        return products;
    } catch (error) {
        // Add appropriate error handling, such as logging the error.
        console.error("Error in getProductDataService:", error);
        throw error;
    }
}
