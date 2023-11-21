import React from 'react';
import ProductCard from '../components/ProductCard';

const SearchResults = ({ searchResults }) => {
    return (
        <div>
            <h2>Search Results</h2>
            <div className="search-results">
                {searchResults.map((product) => (
                    <ProductCard key={product._id} productData={product} />
                ))}
            </div>
        </div>
    );
};

export default SearchResults;
