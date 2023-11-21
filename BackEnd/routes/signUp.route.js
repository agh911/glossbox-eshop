import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const router = express.Router();

router.route('/')
    .post(async (req, res) => {
        const { email, name, username, password } = req.body;

        try {
            const existingUser = await User.findOne({ email });

            if (existingUser) {
                return res.status(400).json({ message: 'Email is already in use.' });
            }

            // const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new User({
                name,
                username,
                email,
                password,
            });

            await newUser.save();

            // // Generate a JWT for the user
            // const token = newUser.generateAuthToken();
            // console.log("Generated JWT Token:", token);

            // // Decode and log the contents of the token
            // const decodedToken = jwt.decode(token, { complete: true });
            // console.log("Decoded JWT Token:", decodedToken);

            // // Verify the token signature
            // try {
            //     const verifiedToken = jwt.verify(token, `${import.meta.env.SECRET_KEY}`);
            //     console.log("Verified JWT Token:", verifiedToken);
            // } catch (error) {
            //     console.error("JWT Verification Failed:", error);
            // }

            res.status(201).json({ message: 'Sign up successful.' });
        } catch (error) {
            console.error("Error during signup:", error);
            res.status(500).json({ message: 'Internal server error.', error: error.message });
        }
    });

export { router as signUpRoute };