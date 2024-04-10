import PropTypes from "prop-types";
import { SignInForm } from "../components/authentication/SignInForm.jsx";
import "./SigningPages.css";

const SignIn = ({ handleSignIn }) => {

    return (
        <div className="container-fluid pt-4">
            <div className="d-flex justify-content-center mt-3">
                <div className="col d-flex flex-column align-items-center justify-content-center my-5">
                    <h1 className="fs">Welcome to GlossBox</h1>
                    <p className="sec-font-sm">Your Beauty, Your Way</p>
                    <SignInForm handleSignIn={handleSignIn} />
                    <p className="sec-font-sm">Don't have an account?</p>
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

export default SignIn;