import React, { useState } from 'react';
import axios from 'axios';

const BasketItemCard = ({ user, product, quantity, updateQuantity, removeItem }) => {
    const [newQuantity, setNewQuantity] = useState(quantity);
    const [isEditing, setIsEditing] = useState(false);

    const handleChange = (e) => {
        setNewQuantity(e.target.value);
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`${import.meta.env.VITE_GLOSSBOXURL}/api/basket/${user._id}/${product._id}`, {
                quantity: newQuantity,
            });
            updateQuantity(product._id, newQuantity);
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
            <div className="container basket-item row mb-3">
                <div className="col-lg-8 d-flex">
                    <div className="basket-card-img">
                        <img src={product.imageUrl} alt={product.name} />
                    </div>
                    <div className="d-flex flex-column align-content-between">
                        <p className="ms-4">{product.name}</p>
                        <div className="d-flex align-items-center ms-4">
                            <button className="btn" onClick={toggleEdit}>Edit</button>
                            <p className="mb-0">&nbsp;&nbsp;/&nbsp;&nbsp;</p>
                            <button className="btn" onClick={() => removeItem(product._id)}>Remove</button>
                        </div>
                    </div>
                </div>
                <div className="col-lg-2 text-center">
                    {isEditing ? (
                        <input type="number" min="1" value={newQuantity} onChange={handleChange} />
                    ) : (
                        <p>{quantity}</p>
                    )}
                </div>
                <div className="col-lg-2 text-end">
                    {isEditing ? (
                        <button className="btn" onClick={handleUpdate}>Update</button>
                    ) : (
                        <p>£{product.price.toFixed(2)}</p>
                    )}
                </div>
            </div>
            <hr />
        </>
    );
};

export default BasketItemCard;
