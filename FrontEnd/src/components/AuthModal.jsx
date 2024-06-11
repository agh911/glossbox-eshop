import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Card.css';

const AuthModal = ({ showAuthModal, closeAuthModal }) => {
    const navigate = useNavigate();

    const handleSignIn = () => {
        closeAuthModal();
        navigate('/signin');
    };

    const handleSignUp = () => {
        closeAuthModal();
        navigate('/signup');
    };

    if (!showAuthModal) return null;

    return (
        <div className="auth-modal-overlay d-flex justify-content-center align-items-center">
            <div className="auth-modal">
                <div className="auth-modal-content">
                    <div className="modal-header d-flex flex-column align-items-center text-center">
                        <h5 className="modal-title fs">Sign In to Continue</h5>
                        <button type="button" className="btn-close mt-2" aria-label="Close" onClick={closeAuthModal}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 92 92" id="Cross" className='align-top'><path d="M70.7 64.3c1.8 1.8 1.8 4.6 0 6.4-.9.9-2 1.3-3.2 1.3-1.2 0-2.3-.4-3.2-1.3L46 52.4 27.7 70.7c-.9.9-2 1.3-3.2 1.3s-2.3-.4-3.2-1.3c-1.8-1.8-1.8-4.6 0-6.4L39.6 46 21.3 27.7c-1.8-1.8-1.8-4.6 0-6.4 1.8-1.8 4.6-1.8 6.4 0L46 39.6l18.3-18.3c1.8-1.8 4.6-1.8 6.4 0 1.8 1.8 1.8 4.6 0 6.4L52.4 46l18.3 18.3z" fill="#3c2b2e"></path></svg>
                        </button>
                    </div>
                    <div className="modal-body d-flex flex-column align-items-center text-center">
                        <p className="sec-font">You need to be signed in before you can add products to your basket and place an order.</p>
                    </div>
                    <div className="modal-footer d-flex flex-column align-items-center text-center">
                        <button type="button" className="btn auth-signin-btn" onClick={handleSignIn}>Sign In</button>
                        <div>
                            <p className='sec-font-sm mt-4 mb-1'>Don't have an account?</p>
                            <button type="button" className="btn auth-signup-btn mt-2" onClick={handleSignUp}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;