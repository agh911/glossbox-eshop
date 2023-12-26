import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './Card.css';

const ProductCard = ({ productData }) => {
    const navigate = useNavigate();

    const handleClick = (id) => {
        navigate(`/product/${id}`);
    }

    return (
        <div className="product-card mb-3" onClick={() => handleClick(productData._id)}>
            <div className="product-card-img">
                <img src={productData.imageUrl} alt="" />
            </div>
            <div className="d-flex flex-column">
                <p className='text-start mb-0'>{productData.brand}</p>
                <div className="product-name-and-price d-flex justify-content-between mx-1 mt-2">
                    <p className="p-name me-1">{productData.name}</p>
                    <p className="p-price">£{productData.price}</p>
                </div>
            </div>
        </div >
    );
}

export default ProductCard;

// import PropTypes from 'prop-types';

// ProductCard.propTypes = {
//     product: PropTypes.shape({
//         image: PropTypes.string.isRequired,
//         name: PropTypes.string.isRequired,
//         price: PropTypes.number.isRequired,
//     }).isRequired,
// };

// export default ProductCard;
