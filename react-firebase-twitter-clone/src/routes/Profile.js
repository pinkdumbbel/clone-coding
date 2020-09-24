import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { authService, dbService, storageService } from '../firebase';

function Profile({ userObj }) {
    useEffect(() => {
        console.log('12313123213');
    });
    //const collection = 'twitterClone';
    const history = useHistory();
    const [NewDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const [fileUrl, setFileUrl] = useState(null);
    //const [prevFileUrl, setPrevFileUrl] = useState('');
    const onSignOut = () => {
        authService.signOut();
        history.push('/');
    };

    const onChange = (e) => {
        setNewDisplayName(e.target.value);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        let dataUrl = '';

        if (
            userObj.displayName !== NewDisplayName ||
            userObj.photoURL !== fileUrl
        ) {
            if (fileUrl) {
                const ref = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
                const response = await ref.putString(fileUrl, 'data_url');
                dataUrl = await response.ref.getDownloadURL();
            }
            if ((dataUrl && userObj.photoURL) && dataUrl !== userObj.photoURL) {
                const prevFileUrl = userObj.photoURL;
                await storageService.refFromURL(prevFileUrl).delete();
            }
            userObj.updateProfile({
                displayName: NewDisplayName,
                photoURL: dataUrl
            });
        }

        setFileUrl(null);
    };

    const onFileChange = (e) => {
        const { target: { files } } = e;
        const theFile = files[0];
        const reader = new FileReader();
        reader.readAsDataURL(theFile);
        reader.onloadend = (finishedEvent => {
            const { currentTarget: { result } } = finishedEvent;
            setFileUrl(result);
        });
    };

    /* const getUser = async () => {
        const db = await dbService.collection(collection)
            .where('creatorID', '==', userObj.uid)
            .orderBy('createAt');
        db.get().then(result => console.log(result.docs.map(doc => doc.data())));
    };
    */
    return (
        <>
            {
                userObj && <form onSubmit={onSubmit}>
                    <input
                        type='text'
                        placeholder='Display Name'
                        onChange={onChange}
                        value={NewDisplayName}
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