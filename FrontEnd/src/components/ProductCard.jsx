import React from 'react';
import './ProductCard.css';

const ProductCard = () => {
    return (
        <div className="product-card">
            <div className="product-card-img">
                <img src="https://imgs.search.brave.com/KC8AFOkWNp-UUPIsLyTWRu2LxIDqSxefRXyBHtWYgi0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly93d3cu/YnlyZGllLmNvbS90/aG1iL2Jtckh6enJZ/b0piTm5NaVVtUEdj/V3dLVklkZz0vMTAw/MHgxMDAwL2ZpbHRl/cnM6bm9fdXBzY2Fs/ZSgpOm1heF9ieXRl/cygxNTAwMDApOnN0/cmlwX2ljYygpL0hF/Uk8tMDBkYThkMWY3/YzkxNDU2Yjg2Y2Rk/YjdiMjZhZmUxMDMu/anBn" alt="" />
            </div>
            <div className="product-name-and-price d-flex mx-1 mt-2">
                <p className="p-name me-1">The Ordinary Glycolic Acid 7% Toning Solution 240ml</p>
                <p className="p-price">£19.22</p>
            </div>
        </div>
    );
}

export default ProductCard;
