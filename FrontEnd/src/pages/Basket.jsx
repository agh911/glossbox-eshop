import React from 'react';
import BasketItemCard from '../components/BasketItemCard';
import OrderSummary from '../components/OrderSummary';

const Basket = ({ signedIn, user, productData }) => {
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

    const total = user && user.basket ? calculateTotal() : 0;

    return (
        <div className="container pt-5">
            <h1 className="fs pt-2">Your Basket</h1>
            <div className="row d-flex justify-content-between">
                <div className="col-lg-8">
                    <div className="container row">
                        <div className="col-lg-8">
                            <p className='m-0'>Product details</p>
                        </div>
                        <div className="col-lg-2 text-center">
                            <p className='m-0'>Quantity</p>
                        </div>
                        <div className="col-lg-2 text-end">
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
                                        product={product}
                                        quantity={basketItem.quantity} />
                                );
                            })}
                        </div>
                    )}
                </div>
                <div className="col-lg-3 ms-4">
                    <OrderSummary numberOfItems={numberOfItems} total={total} />
                </div>
            </div>
        </div>
    );
}

export default Basket;
