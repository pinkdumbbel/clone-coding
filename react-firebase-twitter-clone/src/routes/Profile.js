import React from 'react';

function Profile({ profileProps }) {

    const { userObj, onSignOut, onChange, onSubmit, onFileChange, fileUrl, newDisplayName } = profileProps;

    console.log(userObj);

    return (
        <>
            {
                userObj && <form onSubmit={onSubmit}>
                    <input
                        type='text'
                        placeholder='Display Name'
                        onChange={onChange}
                        value={newDisplayName}
                    />
                    <input
                        type='file'
                        accept='image/*'
                        onChange={onFileChange}
                    />
                    <input type='submit' value='Update Profile' />
                </form>
            }
            {fileUrl && <div><img src={fileUrl} alt="preview" width="50px" height="50px" /></div>}
            {userObj.photoURL && <div><img src={userObj.photoURL} alt="preview" width="50px" height="50px" /></div>}
            <button onClick={onSignOut}>Sign Out</button>
        </>
    );
}

export default Profile;