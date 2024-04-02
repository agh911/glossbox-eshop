import React from 'react';
import "./AddToBagModal.css";

const AddToBagModal = ({ showModal, isSuccess }) => {
    return (
        <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-content">
                <div className="modal-body">
                    {isSuccess ? 'Product added to bag successfully!' : 'Failed to add product to bag.'}
                </div>
            </div>
        </div>
    );
};

export default AddToBagModal;
