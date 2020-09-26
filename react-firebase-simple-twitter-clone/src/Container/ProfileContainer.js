import React, { useState } from 'react';
import Profile from '../Routes/Profile';
import propsCreateFn from '../Module/ProfileFunction';
import { useHistory } from 'react-router-dom';

function ProfileContainer({ userObj, refreshUser }) {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName ? userObj.displayName : 'escapew');
    const [fileUrl, setFileUrl] = useState(null);

    const profileProps = propsCreateFn(userObj, fileUrl, newDisplayName, setFileUrl, setNewDisplayName, refreshUser, history);

    return (
        <Profile
            profileProps={profileProps}
        />
    );
}

export default ProfileContainer;