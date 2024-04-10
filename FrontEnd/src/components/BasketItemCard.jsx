import React, { useState, useEffect } from 'react';
import QuantityInput from './QuantityInput.jsx';
import axios from 'axios';
import "./Card.css";

import { getSingleProductData } from '../../utils/dataService.js';

const BasketItemCard = ({ user, productId, quantity, updateQuantity, removeItem }) => {
    const [product, setProduct] = useState(null);
    const [newQuantity, setNewQuantity] = useState(quantity);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const productData = await getSingleProductData(productId);
                setProduct(productData);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };
        fetchProduct();
    }, [productId]);

    const handleChange = (e) => {
        setNewQuantity(e.target.value);
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`${import.meta.env.VITE_GLOSSBOXURL}/api/basket/${user._id}/${productId}`, {
                quantity: newQuantity,
            });
            updateQuantity(productId, newQuantity);
            setIsEditing(false);
        } catch (error) {
            console.error(error.message);
        }
    };

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    return (
        <>
            {product && (
                <div className="container basket-item row mb-3">
                    <div className="col-8 d-flex">
                        <div className="basket-card-img">
                            <img src={product.imageUrl} alt={product.name} />
                        </div>
                        <div className="d-flex flex-column align-content-between">
                            <p className="ms-4">{product.name}</p>
                            <div className="d-flex align-items-center ms-4">
                                {isEditing ? (
                                    <button className="btn" onClick={handleUpdate}>Update</button>
                                ) : (
                                    <button className="btn" onClick={toggleEdit}>Edit</button>
                                )}
                                <p className="mb-0">&nbsp;&nbsp;/&nbsp;&nbsp;</p>
                                <button className="btn" onClick={() => removeItem(productId)}>Remove</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-2 d-flex align-items-center justify-content-center">
                        {isEditing ? (
                            <QuantityInput
                                value={newQuantity}
                                onChange={setNewQuantity}
                                min={1}
                            />
                        ) : (
                            <p>{quantity}</p>
                        )}
                    </div>
                    <div className="col-2 d-flex align-items-center justify-content-end">
                        <p>£{product.price.toFixed(2)}</p>
                    </div>
                </div>
            )}
            <hr />
        </>
    );
};

export default BasketItemCard;
