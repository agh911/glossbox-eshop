import React from 'react';
import BasketItemCard from '../components/BasketItemCard';
import OrderSummary from '../components/OrderSummary';
import axios from 'axios';

const Basket = ({ signedIn, user, productData, setProductData }) => {
    const findProductData = (productId) => {
        return productData.find((product) => product._id === productId);
    };

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

    const removeItem = async (productId) => {
        try {
            await axios.delete(`${import.meta.env.VITE_GLOSSBOXURL}/api/basket/${user._id}/${productId}`);
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
            await axios.put(`${import.meta.env.VITE_GLOSSBOXURL}/api/basket/${user._id}/${productId}`, {
                items: updatedBasket
            });
            setProductData(updatedBasket);
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div className="container pt-5 mb-5">
            <h1 className="fs pt-4">Your Basket</h1>
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
                                const product = findProductData(basketItem.product);
                                return (
                                    <BasketItemCard
                                        key={basketItem._id}
                                        user={user}
                                        product={product}
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
                    <OrderSummary user={user} numberOfItems={numberOfItems} total={total} findProductData={findProductData} />
                </div>
            </div>
        </div>
    );
}

export default Basket;
