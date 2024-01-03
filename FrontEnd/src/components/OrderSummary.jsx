import React from 'react';
import './Card.css';

const OrderSummary = ({ numberOfItems, total }) => {

    return (
        <>
            <div className="container row">
                <div className="col-lg-12">
                    <p className='mb-0'>Summary</p>
                </div>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
                <p>Items to order</p>
                <p>{numberOfItems}</p>
            </div>
            {/* <div className="d-flex justify-content-between">
                <p>Delivery</p>
                <p>£</p>
            </div> */}
            <hr />
            <div className="d-flex justify-content-between">
                <p>Total</p>
                <p>£{total}</p>
            </div>

            <button className='checkout-button mb-5'>Check Out</button>
        </>
    );
}

export default OrderSummary;
