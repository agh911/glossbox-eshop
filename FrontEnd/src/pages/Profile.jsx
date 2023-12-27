import React from 'react';

const Profile = ({ signedIn, user }) => {
    return (
        <div className="container pt-5">
            {signedIn &&
                <h4>Hi, {user.name}</h4>
            }
        </div>
    );
}

export default Profile;
