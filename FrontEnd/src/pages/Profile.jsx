import React, { useState } from 'react';

const MyPurchases = ({ user }) => (
    <div>
        <h2>My Purchases</h2>
        <p>List of purchased items by {user.name}</p>
    </div>
);

const PersonalDetails = ({ user }) => (
    <div>
        <h2>Personal Details</h2>
        <p>Email: {user.email}</p>
    </div>
);

const Profile = ({ signedIn, handleSignOut, user }) => {
    console.log(user)
    const [selectedTab, setSelectedTab] = useState('MyPurchases');

    const handleTabChange = (tabName) => {
        setSelectedTab(tabName);
    };

    return (
        <div className="container pt-5">
            <div className="d-flex my-4">
                {signedIn && (
                    <>
                        <div className="d-flex flex-column">
                            <h4>Hi {user.name}</h4>
                            <div
                                className={`profile-tab ${selectedTab === 'MyPurchases' ? 'active' : ''}`}
                                onClick={() => handleTabChange('MyPurchases')}
                            >
                                My Purchases
                            </div>
                            <div
                                className={`profile-tab ${selectedTab === 'PersonalDetails' ? 'active' : ''}`}
                                onClick={() => handleTabChange('PersonalDetails')}
                            >
                                Personal Details
                            </div>
                            <div onClick={handleSignOut} className="profile-tab">
                                Log out
                            </div>
                        </div>
                        <div className="profile-content">
                            {selectedTab === 'MyPurchases' && <MyPurchases user={user} />}
                            {selectedTab === 'PersonalDetails' && <PersonalDetails user={user} />}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Profile;
