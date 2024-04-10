import React from 'react'

const PageWrapper = ({ children }) => {
    return (
        <div className="container pt-5 mb-5">
            {children}
        </div>
    );
};

export default PageWrapper;

