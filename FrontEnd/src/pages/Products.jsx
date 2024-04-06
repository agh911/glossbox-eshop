import React from 'react';
import ProductCard from '../components/ProductCard';

const Products = ({ productData, addToBasket }) => {
    return (
        <div className="container mb-5 pt-5">
            <h3 className="fs pt-4 mb-3">Products</h3>
            <div className="row mx-auto">
                {productData.map((product) => (
                    <div className="col-lg-3 col-md-6 col-sm-12" key={product._id}>
                        <ProductCard productData={product} addToBasket={addToBasket} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Products;