import { signInService, signUpService, getUserByQuery } from "../services/user.service.js";
import { validationResult } from "express-validator";
import { io } from "../server.js";

export const signInController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send('Sign In failed');
    }
    try {
        const response = await signInService(req.body);
        // Emit 'basketUpdated' event if sign-in is successful
        if (response.message === 'Successful signed in') {
            const user = await getUserByQuery({ email: req.body.email });
            io.emit('basketUpdated', { userId: user._id, basket: user.basket });
        }
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(400).send('Sign In failed');
    }
}

export const signUpController = async (req, res) => {
    console.log('Request Body:', req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send('Sign Up failed');
    }
    try {
        const response = await signUpService(req.body);
        // Emit 'basketUpdated' event if sign-up is successful
        if (response.message === 'Sign up successful.') {
            const user = await getUserByQuery({ email: req.body.email });
            io.emit('basketUpdated', { userId: user._id, basket: user.basket });
        }
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(400).send('Sign Up failed');
    }
}