import PropTypes from "prop-types";
import { useParams, useNavigate } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import { SignInForm } from "../components/authentication/SignInForm.jsx";
import "./SigningPages.css";

export const SignIn = () => {

    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-center">
                <div className="col d-flex flex-column align-items-center justify-content-center my-5">
                    <h1>Welcome to GlossBox</h1>
                    <p>Your Beauty, Your Way</p>
                    <SignInForm />
                    <p>Don't have an account?</p>
                    <a href="/signUp">
                        <button className='sign-up-button'>
                            Sign Up
                        </button>
                    </a>
                </div>
            </div>
        </div>
    );
};
