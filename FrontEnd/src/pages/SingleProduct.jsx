import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReviewCard from '../components/ReviewCard';
import './SingleProductPage.css';

const SingleProduct = ({ productData, user }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const product = productData.find((product) => product._id === id);
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [sortBy, setSortBy] = useState('');
    const [buttonText, setButtonText] = useState('Sort by');

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

    const sortReviews = (criteria, text) => {
        setSortBy(criteria);
        setButtonText(text);
    };

    return (
        <div className="container pt-5">
            <div className="row mt-3 mb-5">
                <div className="col-12 col-md-7 order-md-1 order-1 pe-md-3">
                    <div className="product-image-container">
                        <img src={product.imageUrl} alt={product.name} className="img-fluid product-image" />
                    </div>
                </div>
                <div className="col-12 col-md-5 order-md-2 order-2 ps-md-3">
                    <div className="product-info">
                        <h5 className="prim-font">{product.brand}</h5>
                        <h6 className="sec-font">{product.name}</h6>
                        <a
                            data-bs-toggle="collapse"
                            href="#productDescription"
                            role="button"
                            aria-expanded="false"
                            aria-controls="productDescription"
                            className="text-decoration-none"
                        >
                            <div className="flex-grow d-flex justify-content-between align-items-center">
                                <span className="prim-font my-2">Description</span>
                                <ion-icon name="add-outline"></ion-icon>
                            </div>
                            <hr className="mt-0 mb-3" />
                        </a>
                        <div className="collapse show mb-3" id="productDescription">
                            <p className="sec-font">{product.description}</p>
                        </div>
                        <a
                            data-bs-toggle="collapse"
                            href="#productIngredients"
                            role="button"
                            aria-expanded="false"
                            aria-controls="productIngredients"
                            className="text-decoration-none"
                        >
                            <div className="flex-grow d-flex justify-content-between align-items-center">
                                <span className="prim-font my-2">Ingredients</span>
                                <ion-icon name="add-outline"></ion-icon>
                            </div>
                            <hr className="mt-0 mb-3" />
                        </a>
                        <div className="collapse mb-3" id="productIngredients">
                            <p className="sec-font">Aqua (Water), Niacinamide, Pentylene Glycol, Zinc PCA, Dimethyl Isosorbide, Tamarindus Indica Seed Gum, Xanthan Gum, Isoceteth-20, Ethoxydiglycol, Phenoxyethanol, Chlorphenesin.</p>
                        </div>

                        <div className="d-flex justify-content-between align-items-end flex-wrap mt-4">
                            <h4 className="sec-font">£{product.price.toFixed(2)}</h4>
                            <div className="d-flex flex-wrap">
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
            <div className="row">
                <div className="d-flex">
                    <h3 className='me-4'>Reviews</h3>
                    <div className="dropdown">
                        <button className="btn btn-sm btn-outline-dark dropdown-toggle" type="button" id="sortDropdownButton" data-bs-toggle="dropdown" aria-expanded="false">
                            {buttonText}
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="sortDropdownButton">
                            <li><button className="dropdown-item" onClick={() => sortReviews('desc', 'Highest to Lowest Rating')}>Highest to Lowest Rating</button></li>
                            <li><button className="dropdown-item" onClick={() => sortReviews('asc', 'Lowest to Highest Rating')}>Lowest to Highest Rating</button></li>
                        </ul>
                    </div>
                </div>

                {product &&
                    product.reviews &&
                    product.reviews
                        .slice()
                        .sort((a, b) => {
                            if (sortBy === 'asc') {
                                return a.rating - b.rating;
                            } else if (sortBy === 'desc') {
                                return b.rating - a.rating;
                            } else {
                                return 0;
                            }
                        })
                        .map((review, index) => (
                            <ReviewCard key={index} reviewData={review} />
                        ))}
            </div>
        </div>
    );
};

export default SingleProduct;
