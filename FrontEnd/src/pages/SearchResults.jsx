import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

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
        <div className="container pt-5">
            <h2 className="pt-2">Search Results for "{searchQuery}"</h2>
            <div className="row">
                {searchResults.map((product) => (
                    <div key={product._id} className="col-lg-3 col-md-6 col-sm-12">
                        <ProductCard productData={product} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchResults;