import React, { useEffect, useState } from 'react';
import { getUserOrderData, getSingleProductData } from '../../utils/dataService.js';
import "./Card.css";

const MyPurchases = ({ user, productData }) => {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState({});

    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const response = await getUserOrderData(user._id);
                const sortedOrders = response.orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setOrders(response.orders);
            } catch (error) {
                console.error('Error fetching order data:', error);
            }
        };

        fetchOrderData();
    }, [user._id]);

    useEffect(() => {
        const fetchProductData = async (productId) => {
            try {
                const product = await getSingleProductData(productId);
                setProducts(prevState => ({
                    ...prevState,
                    [productId]: product
                }));
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };

        orders.forEach(order => {
            order.items.forEach(item => {
                if (!products[item.productId]) {
                    fetchProductData(item.productId);
                }
            });
        });
    }, [orders]);

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
                    <div key={order._id} className="order-card container row mb-4 py-2">
                        <div className="col-7 p-2">
                            <h6 className="sec-font"><strong>Products</strong></h6>
                            {order.items.map(item => (
                                <div key={item._id} className="order-item container row mb-3">
                                    <div className="col-2">
                                        <img src={products[item.productId]?.imageUrl} alt={products[item.productId]?.name} />
                                    </div>
                                    <div className="col-10">
                                        <div className="container row">
                                            <div className="col-12">
                                                <p className="sec-font-sm">{products[item.productId]?.name}</p>
                                            </div>
                                            <div className="col-12">
                                                <div className="container row">
                                                    <div className="col-6">
                                                        <p className="sec-font-sm">Qty: {item.quantity}</p>
                                                    </div>
                                                    <div className="col-6">
                                                        <p className="sec-font-sm">£{item.price.toFixed(2)}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="col-5 p-2">
                            <h6 className='sec-font'><strong>Order details</strong></h6>
                            <div className="d-flex justify-content-between align-items-baseline">
                                <p className="sec-font-sm"><strong>Id:</strong> {order._id}</p>
                                <span className="badge text-bg-dark">{order.status}</span>
                            </div>
                            <p className="sec-font-sm"><strong>Date:</strong> {formatDate(order.createdAt)}</p>
                            <p className="sec-font-sm"><strong>Total:</strong> £{order.total.toFixed(2)}</p>
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
