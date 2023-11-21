import { SignUpForm } from "../components/SignUpForm.jsx";
import "./SigningPages.css";

export const SignUp = () => {
    return (
        <div className="container-fluid">
            <div className="d-flex align-content-center">
                <div className="col d-flex flex-column align-items-center justify-content-center my-5">
                    <h1>Join GlossBox!</h1>
                    <p>Where Beauty Meets You at Your Glow-Up Destination</p>
                    <SignUpForm />
                    <p>Already have an account?</p>
                    <a href="/signIn">
                        <button className='sign-in-button flex-grow'>Sign In</button>
                    </a>
                </div>
            </div>
        </div>
    );
};
