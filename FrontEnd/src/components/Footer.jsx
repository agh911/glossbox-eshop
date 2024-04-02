import React from 'react';
import './Footer.css';

const Footer = () => {
    const handleSubscription = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        console.log(`Subscribed email: ${email}`);
    };

    return (
        <footer className="footer mt-4 pt-5 pb-2">
            <div className="container">
                <h2 className="fs mb-5">glossbox</h2>
                <div className="footer-content d-flex justify-content-between flex-wrap">
                    <div className="d-flex justify-content-between flex-wrap">
                        <div className="footer-section me-5">
                            <h5 className="fs">Quick Links</h5>
                            <p><a href="/">Home</a></p>
                            <p><a href="/shop">Shop</a></p>
                            <p><a href="#">Skincare Quiz</a></p>
                        </div>
                        <div className="footer-section me-5">
                            <h5 className="fs">About us</h5>
                            <p><a href="#">Our Story</a></p>
                            <p><a href="#">Skincare Blog</a></p>
                        </div>
                        <div className="footer-section">
                            <h5 className="fs">Here to help</h5>
                            <p><a href="#">Exchanges & Returns</a></p>
                            <p><a href="#">Shipping & Delivery</a></p>
                            <p><a href="#">Contact Us & FAQs</a></p>
                        </div>
                    </div>
                    <div className="footer-section">
                        <h5 className="fs">Stay in touch</h5>
                        <form onSubmit={handleSubscription}>
                            <div className="mb-1">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter Your Email"
                                    required
                                />
                                <button className="footer-btn" type="submit">Subscribe</button>
                            </div>
                            <label className="mt-1 mb-2">
                                <input className="me-2" type="checkbox" name="newsletter-consent" id="newsletter-consent" required />
                                Yes, I consent to receive emails from <span className="fs">glossbox</span>. Privacy Policy and Terms of Use.
                            </label>
                        </form>
                        <div className="social-icons">
                            <a className="me-2" href="#"><ion-icon name="logo-instagram" /></a>
                            <a className="me-2" href="#"><ion-icon name="logo-tiktok" /></a>
                            <a className="me-2" href="#"><ion-icon name="logo-youtube" /></a>
                            <a className="me-2" href="#"><ion-icon name="logo-facebook" /></a>
                            <a className="me-2" href="#"><ion-icon name="logo-pinterest" /></a>
                            <a href="#"><ion-icon name="logo-twitter" /></a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom mt-5 mb-1">
                    <p>&copy; {new Date().getFullYear()} GlossBox. All rights reserved.</p>
                </div>
            </div>
        </footer >
    );
}

export default Footer;
