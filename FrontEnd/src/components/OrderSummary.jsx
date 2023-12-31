import React from 'react';

const OrderSummary = ({ order, delivery, total }) => {
    return (
        <>
            <div className="container row">
                <div className="col-lg-12">
                    <p>Summary</p>
                    <hr />
                </div>
            </div>
            <div className="d-flex justify-content-between">
                <p>Order value</p>
                <p>£{order}</p>
            </div>
            <div className="d-flex justify-content-between">
                <p>Delivery</p>
                <p>£{delivery}</p>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
                <p>Total</p>
                <p>£{total}</p>
            </div>

            <button className='mb-5'>Check Out</button>
        </>
    );
}

export default OrderSummary;
