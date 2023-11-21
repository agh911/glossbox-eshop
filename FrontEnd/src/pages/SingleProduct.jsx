import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


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
            <div className="row mt-4  mb-5">
                <div className="col-lg-6 col-md-6 col-sm-12">
                    <img src={product.imageUrl} alt={product.name} />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                    <h4>{product.name}</h4>
                    <p>Product Description: <br /> {product.description}</p>
                    <h4>£{product.price}</h4>
                    <button className="shop-btn">Add to bag <ion-icon name="bag" /></button>
                </div>
            </div>
        </div>
    );
}

export default SingleProduct;
