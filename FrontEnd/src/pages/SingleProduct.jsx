import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SingleProductPage.css';

const SingleProduct = ({ productData, user }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const product = productData.find((product) => product._id === id);
    const [selectedQuantity, setSelectedQuantity] = useState(1);

    useEffect(() => {
        if (!product) {
            navigate('/');
        }
    }, [product, navigate]);

    const handleQuantityChange = (event) => {
        const value = parseInt(event.target.value, 10);
        setSelectedQuantity(value > 0 ? value : 1);
    };

    const handleIncrement = () => {
        setSelectedQuantity((prevQuantity) => prevQuantity + 1);
    };

    const handleDecrement = () => {
        setSelectedQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    };

    const handleAddToBag = async () => {
        const addToBagEndpoint = 'http://localhost:3000/api/basket';

        try {
            const userId = user._id;

            const response = await axios.post(addToBagEndpoint, { userId, productId: product._id, quantity: selectedQuantity });

            if (response.data.success) {
                alert('Product added to bag successfully!');
            } else {
                alert(`Failed to add product to bag: ${response.data.error}`);
            }
        } catch (error) {
            console.error('Error adding product to bag:', error.message);
        }
    };

    return (
        <div className="container pt-5">
            <div className="row justify-content-evenly mt-4 mb-5">
                <div className="col-md-6 order-md-1 order-1">
                    <div className="product-image-container">
                        <img src={product.imageUrl} alt={product.name} className="img-fluid product-image" />
                    </div>
                </div>
                <div className="col-md-6 order-md-2 order-2">
                    <div className="product-info">
                        <h6 className="mb-0">{product.brand}</h6>
                        <h5>{product.name}</h5>
                        <a
                            data-bs-toggle="collapse"
                            href="#collapseExample"
                            role="button"
                            aria-expanded="false"
                            aria-controls="collapseExample"
                            className="text-decoration-none"
                        >
                            <div className="flex-grow d-flex justify-content-between align-items-center">
                                <span className="my-2">Description</span>
                                <ion-icon name="add-outline"></ion-icon>
                            </div>
                            <hr className="mt-0 mb-3" />
                        </a>
                        <div className="collapse mb-3" id="collapseExample">
                            <div>{product.description}</div>
                        </div>
                        <div className="d-flex justify-content-between align-items-end">
                            <h4>£{product.price}</h4>
                            <div className="d-flex">
                                <div className="quantity-input me-2">
                                    <div className="input-group">
                                        <button className="btn btn-outline-secondary" onClick={handleDecrement}>
                                            -
                                        </button>
                                        <input
                                            type="number"
                                            id="quantity"
                                            value={selectedQuantity}
                                            onChange={handleQuantityChange}
                                            className="form-control"
                                            min="1"
                                        />
                                        <button className="btn btn-outline-secondary" onClick={handleIncrement}>
                                            +
                                        </button>
                                    </div>
                                </div>
                                <button className="btn btn-primary shop-btn" onClick={handleAddToBag}>
                                    Add to bag <ion-icon name="bag" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleProduct;
