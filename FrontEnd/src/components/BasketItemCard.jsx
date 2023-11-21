import React from 'react';
import "./Card.css";

const BasketItemCard = ({ productData }) => {
    return (
        <div className="basket-item d-flex justify-content-between">
            <div className="d-flex">
                <div className="basket-card-img">
                    <img src={productData.imageUrl} alt={productData.name} />
                </div>
                <p className="ms-4">{productData.name}</p>
            </div>
            <div className="d-flex flex-column align-items-center">
                <p>Quantity</p>
                <p>1</p> {/* You can replace this with the actual quantity if needed */}
            </div>
            <p>£{productData.price.toFixed(2)}</p>
        </div>
    );
}

export default BasketItemCard;
