import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const signInService = async reqBody => {
    const { email, password } = reqBody;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return { message: 'Invalid credentials.' };
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (user && isValidPassword) {
            const token = jwt.sign({ userId: user._id, email: user.email }, process.env.SECRET_KEY, { expiresIn: '1h' });

            return { message: 'Successful sign in.', user, token };
        } else {
            return { message: 'Invalid credentials.' };
        }

    } catch (error) {
        console.error(error);
        return { message: 'Internal server error.' };
    }
}

export const signUpService = async reqBody => {
    const { name, username, email, password } = reqBody;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return { message: 'Email is already in use.' };
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({
            name,
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        return { message: 'Sign up successful.' };
    } catch (error) {
        console.error("Error during signup:", error);
        return { message: 'Internal server error.', error: error.message };
    }
}

export const getUserByQuery = async (query) => {
    try {
        return await User.find(query);
    } catch (e) {
        throw e;
    }
}