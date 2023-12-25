import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './SingleProductPage.css'


const SingleProduct = ({ productData }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const product = productData.find((product) => product._id === id);

    useEffect(() => {
        // If article not found, let the user know by navigating to the error page
        if (!product) {
            navigate('/');
        }
    }, [product, navigate]);

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
                        <h6 className='fs mb-0'>{product.brand}</h6>
                        <h5>{product.name}</h5>
                        <a data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample" className="text-decoration-none">
                            <div className="flex-grow d-flex justify-content-between align-items-center">
                                <span className='my-2'>
                                    Description
                                </span>
                                <ion-icon name="add-outline"></ion-icon>
                            </div>
                            <hr className='mt-0 mb-3' />
                        </a>
                        <div className="collapse mb-3" id="collapseExample">
                            <div>
                                {product.description}
                            </div>
                        </div>
                        <div className='d-flex justify-content-between align-items-end'>
                            <h4>£{product.price}</h4>
                            <button className="btn btn-primary shop-btn">Add to bag <ion-icon name="bag" /></button>
                        </div>

                    </div>
                </div>
            </div>
        </div >

    );
}

export default SingleProduct;
