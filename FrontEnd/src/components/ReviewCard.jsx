import React from 'react';
import './Card.css';

const ReviewCard = ({ reviewData }) => {
    return (
        <div className="review-card p-3 my-2">
            <div className="d-flex mb-3">
                <div className="username me-3">{reviewData.username}</div>
                <div className="rating">
                    {[...Array(reviewData.rating)].map((_, index) => (
                        <ion-icon key={index} name="star"></ion-icon>
                    ))}
                </div>
            </div>
            <div className="comment">{reviewData.comment}</div>
        </div>
    );
};

export default ReviewCard;