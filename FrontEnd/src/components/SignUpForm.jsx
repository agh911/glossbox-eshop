import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUpForm.css';

import { signUpService } from '../../utils/dataService';

export const SignUpForm = () => {
    // console.log('VITE_GLOSSBOXURL:', import.meta.env.VITE_GLOSSBOXURL);
    const [signUp, setSignUp] = useState({
        name: '',
        username: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignUp((signUp) => ({
            ...signUp,
            [name]: value,
        }));
    };

    const signUpSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            await signUpService(signUp);
            navigate('/signIn')
        } catch (error) {
            console.error("Sign-Up failed:", error);
        }
    }

    return (
        <div className="signup-form">
            <h2>Sign Up</h2>
            <form onSubmit={signUpSubmitHandler}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={signUp.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                />
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={signUp.username}
                    onChange={handleChange}
                    placeholder="johndoe"
                    required
                />
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={signUp.email}
                    onChange={handleChange}
                    placeholder="johndoe@mail.com"
                    required
                />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={signUp.password}
                    onChange={handleChange}
                    placeholder="Your secure password"
                    required
                />
                <button className="font-bold " type="submit">Sign Up</button>
            </form>
        </div>
    );
};