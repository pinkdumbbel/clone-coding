import { authService, storageService } from '../firebase';
import { v4 as uuidv4 } from 'uuid';
import { onChange, onFileChange } from './CommonFunction';

const onSignOut = (history) => {
    authService.signOut();
    history.push('/');
};

const onSubmit = async (e, userObj, newDisplayName, fileUrl, setFileUrl, refreshUser) => {
    e.preventDefault();

    let dataUrl = (userObj.photoURL) ? userObj.photoURL : null;
    let editFlag = true;
    let bucketEmpty = false;

    if (newDisplayName === '') {
        alert('변경하실 이름을 입력해 주세요.');
        return false;
    }

    if (
        userObj.displayName !== newDisplayName ||
        userObj.photoURL !== fileUrl
    ) {
        //파일 업로드
        if (fileUrl) {
            try {

                const bucket = await storageService.ref().child(userObj.uid).listAll();
                bucketEmpty = (bucket.items.length === 0) ? true : false;

                const ref = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
                const response = await ref.putString(fileUrl, 'data_url');
                dataUrl = await response.ref.getDownloadURL();

            } catch (e) {
                editFlag = false;
                console.log(e);
            }
        }

        //파일 업로드시 기존파일 삭제후 새파일로 스토리지에 업로드
        if ((dataUrl && userObj.photoURL) && (dataUrl !== userObj.photoURL) && !bucketEmpty) {
            try {
                await storageService.refFromURL(userObj.photoURL).delete();
            } catch (e) {
                editFlag = false;
                console.log(e);
            }
        }

        if (editFlag) {
            await userObj.updateProfile({
                displayName: newDisplayName,
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

const propsCreateFn = (userObj, fileUrl, newDisplayName, setFileUrl, setNewDisplayName, refreshUser, history) => ({
    userObj,
    onSignOut: () => onSignOut(history),
    onChange: (e) => onChange(e, setNewDisplayName),
    onSubmit: (e) => onSubmit(e, userObj, newDisplayName, fileUrl, setFileUrl, refreshUser),
    onFileChange: (e) => onFileChange(e, setFileUrl),
    fileUrl,
    newDisplayName
});

export default propsCreateFn;