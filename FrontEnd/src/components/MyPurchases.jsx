import React, { useEffect, useState } from 'react';
import { getUserOrderData } from '../../utils/dataService.js';
import "./Card.css";

const MyPurchases = ({ user, productData }) => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const response = await getUserOrderData(user._id);
                setOrders(response.orders);
            } catch (error) {
                console.error('Error fetching order data:', error);
            }
        };

        fetchOrderData();
    }, [user._id]);

    const findProductData = (productId) => {
        return productData.find((product) => product._id === productId);
    };

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: 'long', year: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', options);
    };

    return (
        <div>
            <h4 className="fs">My Purchases</h4>
            {orders.length > 0 ? (
                orders.map(order => (
                    <div key={order._id} className="order-card container row d-flex justify-content-between mb-4 py-2">
                        <div className="col-4">
                            <h6>Order details</h6>
                            <div className="d-flex justify-content-between align-items-baseline">
                                <p>Id: {order._id}</p>
                                <span class="badge text-bg-dark">{order.status}</span>
                            </div>
                            <p>Date: {formatDate(order.createdAt)}</p>
                            <p>Total: £{order.total.toFixed(2)}</p>
                        </div>
                        <div className="col-7">
                            <h6>Products</h6>
                            {order.items.map(item => (
                                <div key={item._id} className="order-item container row mb-3">
                                    <div className="col-2">
                                        <img src={findProductData(item.productId).imageUrl} alt={findProductData(item.productId).name} />
                                    </div>
                                    <div className="col-10">
                                        <div className="container row">
                                            <div className="col-12">
                                                <p>{findProductData(item.productId).name}</p>
                                            </div>
                                            <div className="col-12">
                                                <div className="container row">
                                                    <div className="col-6">
                                                        <p>Qty: {item.quantity}</p>
                                                    </div>
                                                    <div className="col-6">
                                                        <p>£{item.price.toFixed(2)}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            ) : (
                <p>No orders found.</p>
            )}
        </div>
    )
};


export default MyPurchases;
