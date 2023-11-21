import React from 'react';
import BasketItemCard from '../components/BasketItemCard';

const Basket = ({ basket }) => {
    return (
        <div className="container pt-5">
            <h1 className="fs pt-2">Your Basket</h1>
            <hr />
            <p>Your basket is empty.</p>
            <hr />
            <p className='d-flex justify-content-end'>Total: £0.00</p>
            <button className='mb-5'>Check Out</button>
        </div>
    );
    // if (!basket || basket.length === 0) {
    //     return (
    //         <div className="container pt-5">
    //             <h1 className="fs pt-2">Your Basket</h1>
    //             <hr />
    //             <p>Your basket is empty.</p>
    //             <hr />
    //             <p className='d-flex justify-content-end'>Total: £0.00</p>
    //             <button className='mb-5'>Check Out</button>
    //         </div>
    //     );
    // }

    // const calculateTotal = () => {
    //     // Calculate the total price of items in the basket
    //     const total = basket.reduce((acc, item) => acc + item.price, 0);
    //     return total.toFixed(2); // Format total as a currency
    // };

    // return (
    //     <div className="container pt-5">
    //         <h1 className="fs pt-2">Your Basket</h1>
    //         <hr />
    //         {basket.map((item, index) => (
    //             <BasketItemCard key={index} productData={item} />
    //         ))}
    //         <hr />
    //         <p className='d-flex justify-content-end'>Total: £{calculateTotal()}</p>
    //         <button className='mb-5'>Check Out</button>
    //     </div>
    // );
}

export default Basket;
