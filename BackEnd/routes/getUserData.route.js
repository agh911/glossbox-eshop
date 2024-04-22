import express from 'express';
import { getUser } from '../controllers/user.controller.js';

const router = express.Router();

router.route(`/getUser`)
    .post(getUser);

export { router as getUserDataRoute };