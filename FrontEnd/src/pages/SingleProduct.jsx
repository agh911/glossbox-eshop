import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import QuantityInput from '../components/QuantityInput.jsx';
import AddToBagModal from '../components/AddToBagModal';
import ReviewCard from '../components/ReviewCard';
import AuthModal from '../components/AuthModal';
import './SingleProductPage.css';

import { getSingleProductData, addToBasket } from '../../utils/dataService.js';
import { socket } from '../../utils/socket.js';

const SingleProduct = ({ user, setNumberOfItems }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [sortBy, setSortBy] = useState('');
    const [buttonText, setButtonText] = useState('Sort by');
    const [showModal, setShowModal] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const product = await getSingleProductData(id);
                setProduct(product);
            } catch (error) {
                console.error('Error fetching product data:', error);
                navigate('/');
            }
        };

        fetchProductData();
    }, [id, navigate]);

    const handleAddToBag = async () => {
        if (!user || !user._id) {
            setShowAuthModal(true);
            return;
        }

        try {
            const userId = user._id;

            const response = await addToBasket(userId, product._id, selectedQuantity);

            if (response.success) {
                setIsSuccess(true);
                const totalItems = response.basket.items.reduce((acc, item) => acc + item.quantity, 0);
                setNumberOfItems(totalItems);
                socket.emit('basketUpdated', { userId, basket: response.basket });
            } else {
                setIsSuccess(false);
            }

            setShowModal(true);

            setTimeout(() => {
                setShowModal(false);
            }, 3000);
        } catch (error) {
            console.error('Error adding product to bag:', error.message);
        }
    };

    const sortReviews = (criteria, text) => {
        setSortBy(criteria);
        setButtonText(text);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const closeAuthModal = () => {
        setShowAuthModal(false);
    };

    return (
        <div className="container pt-5">
            {product && (
                <div className="row pt-2 mt-3 mb-5">
                    <div className="col-12 col-md-7 order-md-1 order-1 pe-md-3">
                        <div className="product-image-container">
                            <img src={product.imageUrl} alt={product.name} className="img-fluid product-image" />
                        </div>
                    </div>
                    <div className="col-12 col-md-5 order-md-2 order-2 d-flex flex-column justify-content-between ps-md-3">
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
                                    <span className="prim-font-sm my-2">Description</span>
                                    <ion-icon name="add-outline"></ion-icon>
                                </div>
                                <hr className="mt-0 mb-3" />
                            </a>
                            <div className="collapse show mb-3" id="productDescription">
                                <p className="sec-font-sm">{product.description}</p>
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
                                    <span className="prim-font-sm my-2">Ingredients</span>
                                    <ion-icon name="add-outline"></ion-icon>
                                </div>
                                <hr className="mt-0 mb-3" />
                            </a>
                            <div className="collapse mb-3" id="productIngredients">
                                <p className="sec-font-sm">{product.ingredients.join(', ')}</p>
                            </div>
                        </div>
                        <div>
                            <div className="d-flex justify-content-between align-items-end flex-wrap mt-5 position-relative">
                                <h4 className="thr-font">£{product.price.toFixed(2)}</h4>
                                <div className="d-flex flex-wrap">
                                    <QuantityInput
                                        value={selectedQuantity}
                                        onChange={setSelectedQuantity}
                                        min={1}
                                    />
                                    <button className="btn btn-primary shop-btn ms-2" onClick={handleAddToBag}>
                                        Add to bag <ion-icon name="bag" />
                                    </button>
                                </div>
                                <AddToBagModal showModal={showModal} closeModal={closeModal} isSuccess={isSuccess} />
                                <AuthModal showAuthModal={showAuthModal} closeAuthModal={closeAuthModal} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="row">
                <div className="d-flex">
                    <h3 className='fs me-4'>Reviews</h3>
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
