import express from 'express';
import { signInController, signUpController } from '../controllers/user.controller.js';
import { validateUser } from '../middlewares/glossbox.validation.js';
import jwt from 'jsonwebtoken';

const signInRouter = express.Router();
signInRouter.route('/')
    .post(signInController);

export { signInRouter as signInRoute };


const signUpRouter = express.Router();
signUpRouter.route('/')
    .post(signUpController);

export { signUpRouter as signUpRoute };

const secretKey = process.env.SECRET_KEY;
export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, secretKey, (err) => {
            if (err) return res.sendStatus(403);
            next();
        })
    } else {
        res.sendStatus(401);
    }
}