import express from 'express';
import { allProducts, singleProduct } from '../controllers/allProducts.controller.js';

const router = express.Router();

router.route(`/`).get(allProducts);
router.route('/product/:productId').get(singleProduct);


export { router as getProductDataRoute };