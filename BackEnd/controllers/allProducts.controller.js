import { getProductDataService, getSingleProductDataService } from "../services/products.service.js";

export const allProducts = async (req, res) => {
    try {
        const products = await getProductDataService();
        res.json(products)
    } catch (error) {
        res.status(404).send(`Not found. Something went wrong while trying to retrieve the data.`);
    }
}

export const singleProduct = async (req, res) => {
    try {
        const productId = req.params.productId;
        const product = await getSingleProductDataService(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found.' });
        }
        return res.json(product);
    } catch (error) {
        console.error("Error in singleProduct controller:", error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
}