import { getUserByQuery, signInService, signUpService } from "../services/user.service.js";
import { validationResult } from "express-validator";

export const getUser = async (req, res) => {
    try {
        const { email } = req.body;
        const users = await getUserByQuery({ 'email': email });
        res.json(users[0])
    } catch (e) {
        console.log(e);
        res.status(404).send(`Apologies, we were not able to find this user.`);
    }
}

export const signInController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send('Sign In failed');
    }
    try {
        const response = await signInService(req.body);
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
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(400).send('Sign Up failed');
    }
}