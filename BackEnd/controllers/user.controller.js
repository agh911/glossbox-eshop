import { signInService, signUpService } from "../services/user.service.js";
import { validationResult } from "express-validator";

export const signInController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send('Sign In failed');
    }
    try {
        const response = await signInService(req.body);
        res.status(201).json(response);
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
        res.status(201).json(response);
    } catch (error) {
        console.log(error);
        res.status(400).send('Sign Up failed');
    }
}