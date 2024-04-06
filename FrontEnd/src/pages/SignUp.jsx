import { SignUpForm } from "../components/SignUpForm.jsx";
import "./SigningPages.css";

export const SignUp = () => {
    return (
        <div className="container-fluid pt-4">
            <div className="d-flex align-content-center mt-3">
                <div className="col d-flex flex-column align-items-center justify-content-center my-5">
                    <h1 className="fs">Join GlossBox!</h1>
                    <p className="sec-font-sm">Where Beauty Meets You at Your Glow-Up Destination</p>
                    <SignUpForm />
                    <p className="sec-font-sm">Already have an account?</p>
                    <a href="/signIn">
                        <button className='sign-in-button flex-grow'>Sign In</button>
                    </a>
                </div>
            </div>
        </div>
    );
};
