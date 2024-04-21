import React from 'react';
import ProductCard from '../components/ProductCard.jsx';
import PageWrapper from '../components/PageWrapper.jsx';

const Products = ({ productData, addToBasket }) => {
    return (
        <PageWrapper>
            <h3 className="fs pt-4 mb-3">Products</h3>
            <div className="row mx-auto">
                {productData.map((product) => (
                    <div className="col-lg-3 col-md-6 col-sm-12 d-flex justify-content-center" key={product._id}>
                        <ProductCard productData={product} addToBasket={addToBasket} />
                    </div>
                ))}
            </div>
        </PageWrapper>
    );
}

export default Products;