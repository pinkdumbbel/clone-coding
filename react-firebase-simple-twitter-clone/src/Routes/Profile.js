import React from 'react';

function Profile({ profileProps }) {

    const { userObj, onSignOut, onChange, onSubmit, onFileChange, fileUrl, newDisplayName } = profileProps;

    return (
        <div className="container">
            {
                userObj && <form onSubmit={onSubmit} className="profileForm">
                    <input
                        type='text'
                        placeholder='Display Name'
                        autoFocus
                        className="formInput"
                        onChange={onChange}
                        value={newDisplayName}
                    />
                    <input
                        type='file'
                        accept='image/*'
                        onChange={onFileChange}
                    />
                    <input
                        type='submit'
                        value='Update Profile'
                        className="formBtn"
                        style={{
                            marginTop: 10,
                        }}
                    />
                </form>


            }
            {fileUrl && <div><img src={fileUrl} alt="preview" width="50px" height="50px" /></div>}
            {userObj.photoURL && <div><img src={userObj.photoURL} alt="preview" width="50px" height="50px" /></div>}
            <span className="formBtn cancelBtn logOut" onClick={onSignOut}>
                Sign Out
            </span>

        </div>
    );
}

export default Profile;