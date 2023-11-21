import express from 'express';
// import bcrypt from 'bcrypt';
import User from '../models/user.model.js';

const router = express.Router();

router.route('/')
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

            // const isPasswordValid = await bcrypt.compare(password, user.password);

            // if (isPasswordValid) {
            //     // Generate a JWT for the user
            //     const token = user.generateAuthToken();

            //     res.json({ message: 'Successful signed in', user, token });
            // } else {
            //     res.status(401).json({ message: 'Invalid credentials.' });
            // }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error.' });
        }
    });

export { router as signInRoute };