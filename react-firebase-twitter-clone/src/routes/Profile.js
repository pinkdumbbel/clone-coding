import React from 'react';
import { useHistory } from 'react-router-dom';
import { authService } from '../firebase';

function Profile() {
    const history = useHistory();
    const onSignOut = () => {
        authService.signOut();
        history.push('/');
    };
    return (
        <button onClick={onSignOut}>Sign Out</button>
    );
}

export default Profile;