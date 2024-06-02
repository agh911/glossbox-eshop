import React from 'react';
import './Card.css'

const FeedbackCard = ({ feedbackMessage }) => {
    return (
        <div className="feedback-card mb-3">
            <div className="card-content">
                <div className="card-body">
                    <p className="mb-0 px-3 py-2">{feedbackMessage}</p>
                </div>
            </div>
        </div>
    );
};

export default FeedbackCard;