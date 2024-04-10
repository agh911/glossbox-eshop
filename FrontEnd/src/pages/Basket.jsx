import React, { useEffect, useState } from 'react';
import BasketItemCard from '../components/BasketItemCard';
import OrderSummary from '../components/OrderSummary';

import { removeBasketItem, updateBasketItemQuantity } from '../../utils/dataService.js';
import { socket } from '../../utils/socket.js';

const Basket = ({ signedIn, user, productData, numberOfItems, setNumberOfItems }) => {
    const [basketItems, setBasketItems] = useState([]);

    const findProductData = (productId) => {
        return productData.find((product) => product._id === productId);
    };

    useEffect(() => {
        if (signedIn && user) {
            setBasketItems(user.basket.items);
        }
    }, [signedIn, user]);

    useEffect(() => {
        socket.on('basketUpdated', handleBasketUpdate);

        return () => {
            socket.off('basketUpdated', handleBasketUpdate);
        };
    }, []);

    const handleBasketUpdate = ({ userId, basket }) => {
        if (user && userId === user._id) {
            setBasketItems(basket.items);
            updateNumberOfItems(basket.items);
        }
    };

    const removeItem = async (productId) => {
        try {
            await removeBasketItem(user._id, productId);
            const updatedBasketItems = basketItems.filter(item => item.product !== productId);
            setBasketItems(updatedBasketItems);
            updateNumberOfItems(updatedBasketItems);
        } catch (error) {
            console.error(error.message);
        }
    };

    const updateQuantity = async (productId, newQuantity) => {
        try {
            await updateBasketItemQuantity(user._id, productId, newQuantity);
            const updatedBasketItems = basketItems.map(item => {
                if (item.product === productId) {
                    return { ...item, quantity: newQuantity };
                }
                return item;
            });
            setBasketItems(updatedBasketItems);
            updateNumberOfItems(updatedBasketItems);
        } catch (error) {
            console.error(error.message);
        }
    };

    const updateNumberOfItems = (items) => {
        const totalItems = items.reduce((acc, item) => acc + Number(item.quantity), 0);
        setNumberOfItems(totalItems);
    };

    const calculateTotalPrice = () => {
        return basketItems.reduce((total, item) => {
            const product = findProductData(item.product);
            const itemTotal = product ? product.price * item.quantity : 0;
            return total + itemTotal;
        }, 0).toFixed(2);
    };

    return (
        <div className="container pt-5 mb-5">
            <h3 className="fs pt-4">Your Basket</h3>
            <div className="container row d-flex justify-content-between">
                <div className="col-8">
                    <div className="container row">
                        <div className="col-8">
                            <p className='m-0'>Product details</p>
                        </div>
                        <div className="col-2 text-center">
                            <p className='m-0'>Quantity</p>
                        </div>
                        <div className="col-2 text-end">
                            <p className='m-0'>Price</p>
                        </div>
                    </div>
                    <hr />
                    {signedIn && (
                        <div>
                            {basketItems.map((basketItem) => (
                                <BasketItemCard
                                    key={basketItem._id}
                                    user={user}
                                    productId={basketItem.product}
                                    quantity={basketItem.quantity}
                                    updateQuantity={updateQuantity}
                                    removeItem={removeItem}
                                />
                            ))}
                        </div>
                    )}
                </div>
                <div className="col-3 mb-3">
                    <OrderSummary user={user} findProductData={findProductData} numberOfItems={numberOfItems} basketItems={basketItems} calculateTotal={calculateTotalPrice} />
                </div>
            </div>
        </div>
    );
}

export default Basket;
