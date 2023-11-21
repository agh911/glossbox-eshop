import { getProductDataService } from "../services/products.service.js";

export const allProducts = async (req, res) => {
    try {
        const products = await getProductDataService();
        res.json(products)
    } catch (error) {
        res.status(404).send(`Not found. Something went wrong while trying to retrieve the data.`);
    }
}