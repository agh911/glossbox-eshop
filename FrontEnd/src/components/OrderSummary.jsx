import React from 'react';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import './Card.css';

const OrderSummary = ({ user, findProductData }) => {
    const stripe = useStripe();
    const elements = useElements();


    const numberOfItems = user && user.basket && user.basket.items
        ? user.basket.items.reduce((total, item) => total + (item.quantity ? item.quantity : 0), 0)
        : 0;

    const calculateTotal = () => {
        return user.basket.items.reduce((total, basketItem) => {
            const product = findProductData(basketItem.product);
            const itemTotal = product ? product.price * basketItem.quantity : 0;
            return total + itemTotal;
        }, 0);
    };

    const total = user && user.basket ? calculateTotal().toFixed(2) : 0;

    const orderTotal = parseFloat(total).toFixed(2);

    const handleCheckout = async () => {
        const items = user.basket.items.map(basketItem => {
            const product = findProductData(basketItem.product);
            return {
                productId: basketItem.product,
                quantity: basketItem.quantity,
                name: product.name,
                price: product.price,
                image: product.imageUrl,

            }
        });

        try {
            const response = await axios.post(`${import.meta.env.VITE_GLOSSBOXURL}/create-checkout-session`, {
                userId: user._id,
                total: orderTotal,
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
                <div className="col-12">
                    <p className='mb-0'>Summary</p>
                </div>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
                <p>Items to order</p>
                <p>{numberOfItems}</p>
            </div>
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
