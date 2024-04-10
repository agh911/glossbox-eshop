import React from 'react';
import PageWrapper from '../components/PageWrapper.jsx';

const Cancel = () => {
    return (
        <PageWrapper>
            <div className="d-flex flex-column justify-content-center align-items-center">
                <h2 className="fs pt-4">Payment Canceled</h2>
                <p>Your payment has been canceled.</p>
                <img src="https://ouch-cdn2.icons8.com/5Nut1UyXl8DzLqKH4Ux_C0wz4bLDy55XyJFlCZ8U1NQ/rs:fit:368:370/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvNTcz/L2U2YzcyMzdhLWIy/MjktNDkxOS05NzYx/LTg2NGMxNWEzZjQ0/Yi5wbmc.png" alt="" width="310px" height="auto" />
                <div className="mt-4">
                    <a className="sec-font-sm" href="/">Go Back Home</a>
                    <a className="sec-font-sm ms-4" href="/basket">Go back to basket</a>
                </div>
            </div>
        </PageWrapper>
    );
}

export default Cancel;
