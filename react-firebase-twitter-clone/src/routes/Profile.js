import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { authService, storageService } from '../firebase';

function Profile({ userObj, refreshUser }) {
    const [NewDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const [fileUrl, setFileUrl] = useState(null);
    const history = useHistory();

    const onSignOut = () => {
        authService.signOut();
        history.push('/');
    };

    const onChange = (e) => {
        setNewDisplayName(e.target.value);
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        let dataUrl = (userObj.photoURL) ? userObj.photoURL : null;
        let editFlag = true;

        if (NewDisplayName === '') {
            alert('변경하실 이름을 입력해 주세요.');
            return false;
        }

        if (
            userObj.displayName !== NewDisplayName ||
            userObj.photoURL !== fileUrl
        ) {
            //파일 업로드
            if (fileUrl) {
                try {
                    const ref = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
                    const response = await ref.putString(fileUrl, 'data_url');
                    dataUrl = await response.ref.getDownloadURL();
                } catch (e) {
                    editFlag = false;
                    console.log(e);
                }
            }

            //파일 업로드시 기존파일 삭제후 새파일로 스토리지에 업로드
            if ((dataUrl && userObj.photoURL) && dataUrl !== userObj.photoURL) {
                try {
                    await storageService.refFromURL(userObj.photoURL).delete();
                } catch (e) {
                    editFlag = false;
                    console.log(e);
                }
            }

            if (editFlag) {

                await userObj.updateProfile({
                    displayName: NewDisplayName,
                    photoURL: dataUrl
                });

                refreshUser();
                alert('정상적으로 변경 되었습니다.');
            } else {
                alert('오류가 발생했습니다. 관리자에게 문의하세요.');
            }

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