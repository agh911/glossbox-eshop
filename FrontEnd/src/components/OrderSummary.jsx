import React from 'react';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import './Card.css';

// `${import.meta.env.VITE_GLOSSBOXURL}/create-checkout-session`

const OrderSummary = ({ user, numberOfItems, total, findProductData }) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleCheckout = async () => {
        const items = user.basket.items.map(basketItem => {
            const product = findProductData(basketItem.product);
            return {
                quantity: basketItem.quantity,
                name: product.name,
                price: product.price,
                image: product.imageUrl,

            }
        });

        try {
            const response = await axios.post(`${import.meta.env.VITE_GLOSSBOXURL}/create-checkout-session`, {
                items,
            });

            const data = response.data;
            window.location = data.url;
        } catch (error) {
            console.error(error.message);
        }
    };
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

            <button className='checkout-button mb-5' onClick={handleCheckout}>Check Out</button>
        </>
    );
}

export default OrderSummary;
