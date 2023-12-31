import React from 'react';
import "./Card.css";

const BasketItemCard = ({ product, quantity }) => {
    return (
        <>
            <div className="container basket-item row mb-3">
                <div className="col-lg-8 d-flex">
                    <div className="basket-card-img">
                        <img src={product.imageUrl} alt={product.name} />
                    </div>
                    <div className="d-flex flex-column align-content-between">
                        <p className="ms-4">{product.name}</p>
                        <div className="d-flex ms-4">
                            <p>Edit</p>
                            <p>&nbsp;&nbsp;/&nbsp;&nbsp;</p>
                            <p>Remove</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-2 text-center">
                    <p>{quantity}</p>
                </div>
                <div className="col-lg-2 text-end">
                    <p>£{product.price.toFixed(2)}</p>
                </div>

            </div>
            <hr />
        </>
    );
}

export default BasketItemCard;
