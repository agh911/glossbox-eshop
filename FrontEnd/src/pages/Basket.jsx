import React from 'react';
import BasketItemCard from '../components/BasketItemCard';
import OrderSummary from '../components/OrderSummary';

import { removeBasketItem, updateBasketItemQuantity } from '../../utils/dataService.js';

const Basket = ({ signedIn, user, productData, setProductData }) => {
    const findProductData = (productId) => {
        return productData.find((product) => product._id === productId);
    };

    const removeItem = async (productId) => {
        try {
            await removeBasketItem(user._id, productId);
            const updatedProductData = productData.filter(product => product._id !== productId);
            setProductData(updatedProductData);
        } catch (error) {
            console.error(error.message);
        }
    };

    const updateQuantity = async (productId, newQuantity) => {
        try {
            const updatedBasket = user.basket.items.map(item => {
                if (item.product === productId) {
                    return { ...item, quantity: newQuantity };
                }
                return item;
            });
            await updateBasketItemQuantity(user._id, productId, newQuantity);
            setProductData(updatedBasket);
        } catch (error) {
            console.error(error.message);
        }
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
                            {user.basket.items.map((basketItem) => {
                                return (
                                    <BasketItemCard
                                        key={basketItem._id}
                                        user={user}
                                        productId={basketItem.product}
                                        quantity={basketItem.quantity}
                                        updateQuantity={updateQuantity}
                                        removeItem={removeItem}
                                    />
                                );
                            })}
                        </div>
                    )}
                </div>
                <div className="col-3 mb-3">
                    <OrderSummary user={user} findProductData={findProductData} />
                </div>
            </div>
        </div>
    );
}

export default Basket;
