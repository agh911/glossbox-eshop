import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../SigningForms.css';
import FeedbackCard from '../FeedbackCard.jsx';

import { checkSignIn } from './authenticationHelpers.js';

export const SignInForm = ({ handleSignIn }) => {
    const [signIn, setSignIn] = useState({
        email: '',
        password: ''
    });
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignIn((signIn) => ({
            ...signIn,
            [name]: value
        }));
    }

    const signInSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const signInStatus = await checkSignIn(signIn);
            if (signInStatus) {
                await handleSignIn(signIn);
                setFeedbackMessage('Successfully signed-in.');
                navigate('/');
            }
        } catch (error) {
            console.error('Error during sign-in:', error);
            if (error.response && error.response.status === 401) {
                setError(true);
                setFeedbackMessage('Invalid credentials. Please try again.');
            } else if (error.response && error.response.status === 422) {
                setError(true);
                setFeedbackMessage('No account found with this email. Please sign up.');
            } else {
                setError(true);
                setFeedbackMessage('An unexpected error occurred. Please try again later.');
            }
        }
    }

    return (
        <div className="signin-form">
            {error && (<FeedbackCard feedbackMessage={feedbackMessage} />)}
            {/* <h2 className="fs">Sign In</h2> */}
            <form onSubmit={signInSubmitHandler}>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={signIn.email}
                    onChange={handleChange}
                    placeholder="johndoe@mail.com"
                    required
                />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={signIn.password}
                    onChange={handleChange}
                    placeholder="Your password"
                    required
                />
                <button className="font-bold" type="submit">Sign In</button>
            </form>
        </div>
    )
}
