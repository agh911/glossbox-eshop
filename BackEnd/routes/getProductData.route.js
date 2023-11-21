import express from 'express';
import { allProducts } from '../controllers/allProducts.controller.js';

const router = express.Router();

router.route(`/`)
    .get(allProducts);

export { router as getProductDataRoute };