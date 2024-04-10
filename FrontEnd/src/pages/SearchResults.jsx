import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard.jsx';
import PageWrapper from '../components/PageWrapper.jsx';

const SearchResults = ({ productData }) => {
    const location = useLocation();
    const [searchResults, setSearchResults] = useState([]);
    const searchQuery = new URLSearchParams(location.search).get('q');

    useEffect(() => {
        // Filter the productData based on the search query
        const results = productData.filter(
            (product) =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(results);
    }, [productData, searchQuery, location.search]);

    return (
        <PageWrapper>
            <h3 className="fs mt-4">Search Results for "{searchQuery}"</h3>
            <div className="container row">
                {searchResults.map((product) => (
                    <div key={product._id} className="col-lg-3 col-md-6 col-sm-12">
                        <ProductCard productData={product} />
                    </div>
                ))}
            </div>
        </PageWrapper>
    );
};

export default SearchResults;