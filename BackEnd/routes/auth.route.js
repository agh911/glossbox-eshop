import express from 'express';
import User from '../models/user.model.js';

const signInRouter = express.Router();
signInRouter.route('/')
    .post(async (req, res) => {
        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials.' });
            }

            if (user && user.password === password) {
                res.send({ message: 'Successful signed in', user });
            } else {
                res.status(401).send({ message: 'Invalid credentials' });
            }

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error.' });
        }
    });

export { signInRouter as signInRoute };


const signUpRouter = express.Router();
signUpRouter.route('/')
    .post(async (req, res) => {
        const { email, name, username, password } = req.body;

        try {
            const existingUser = await User.findOne({ email });

            if (existingUser) {
                return res.status(400).json({ message: 'Email is already in use.' });
            }

            const newUser = new User({
                name,
                username,
                email,
                password,
            });

            await newUser.save();

            res.status(201).json({ message: 'Sign up successful.' });
        } catch (error) {
            console.error("Error during signup:", error);
            res.status(500).json({ message: 'Internal server error.', error: error.message });
        }
    });

export { signUpRouter as signUpRoute };