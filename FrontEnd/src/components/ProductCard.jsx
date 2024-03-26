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
                <p className='prim-font text-start mt-1 mb-0'>{productData.brand}</p>
                <div className="product-name-and-price d-flex justify-content-between me-2 mt-1">
                    <p className="sec-font p-name me-1">{productData.name}</p>
                    <p className="sec-font p-price">£{productData.price.toFixed(2)}</p>
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
