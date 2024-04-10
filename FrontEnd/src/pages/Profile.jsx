import React, { useState } from 'react';
import MyPurchases from '../components/MyPurchases.jsx';
import PageWrapper from '../components/PageWrapper.jsx';

const PersonalDetails = ({ user }) => (
    <div>
        <h4 className="fs">Personal Details</h4>
        <p>Email: {user.email}</p>
    </div>
);

const Profile = ({ signedIn, handleSignOut, user, productData }) => {
    const [selectedTab, setSelectedTab] = useState('MyPurchases');

    const handleTabChange = (tabName) => {
        setSelectedTab(tabName);
    };

    return (
        <PageWrapper>
            <div className="my-4">
                {signedIn && (
                    <div className="container row d-flex justify-content-between">
                        <div className="col-2">
                            <h4 className="fs">Hi {user.name}</h4>
                            <div
                                className={`profile-tab ${selectedTab === 'MyPurchases' ? 'active' : ''} mb-2`}
                                onClick={() => handleTabChange('MyPurchases')}
                            >
                                My Purchases
                            </div>
                            <div
                                className={`profile-tab ${selectedTab === 'PersonalDetails' ? 'active' : ''} mb-2`}
                                onClick={() => handleTabChange('PersonalDetails')}
                            >
                                Personal Details
                            </div>
                            <div onClick={handleSignOut} className="profile-tab">
                                Log out
                            </div>
                        </div>
                        <div className="col-9 profile-content">
                            {selectedTab === 'MyPurchases' && <MyPurchases user={user} productData={productData} />}
                            {selectedTab === 'PersonalDetails' && <PersonalDetails user={user} />}
                        </div>
                    </div>
                )}
            </div>
        </PageWrapper>
    );
};

export default Profile;
