import React from 'react';
import "./AddToBagModal.css";

const AddToBagModal = ({ showModal, isSuccess }) => {
    return (
        <>
            <div className={`backdrop ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }}></div>

            <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{isSuccess ? 'Success' : 'Error'}</h5>
                        </div>
                        <div className="modal-body">
                            {isSuccess ? 'Product added to bag successfully!' : 'Failed to add product to bag.'}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddToBagModal;
