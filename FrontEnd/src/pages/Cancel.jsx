import React from 'react';

const Cancel = () => {
    return (
        <div className="container pt-5">
            <h2 className="pt-2">Payment Canceled</h2>
            <p>Your payment has been canceled.</p>
            <a href="/">Home</a>
            <br />
            <a href="/basket">Go back to basket</a>
        </div>
    );
}

export default Cancel;
