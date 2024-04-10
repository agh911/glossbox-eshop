import React from 'react';
import PageWrapper from '../components/PageWrapper.jsx';

const Success = () => {
    return (
        <PageWrapper>
            <div className="d-flex flex-column justify-content-center align-items-center">
                <h2 className="fs pt-4">Payment Successful</h2>
                <img src="https://ouch-cdn2.icons8.com/GS3Q7pU5IcTfP0TlTZVuiXvuh-eKSvhBJmXnn2-FCLM/rs:fit:368:368/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvNjky/LzRlMDhmMGFiLWVj/YTctNDA4NC04YjMx/LWIwZThiZTVhMGZk/Yy5wbmc.png" alt="" />
                <p>Thank you for your purchase. Your order has been confirmed and will be shortly on the way.</p>
                <a href="/" className="sec-font-sm">Go Back to Home</a>
            </div>

        </PageWrapper>
    );
}

export default Success;
