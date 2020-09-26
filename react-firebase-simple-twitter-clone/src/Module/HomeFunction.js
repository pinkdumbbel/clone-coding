import { dbService, storageService } from '../firebase';
import { v4 as uuidv4 } from 'uuid';
import { onChange, onFileChange } from './CommonFunction';

const collection = 'twitterClone';

//uid = userobj.uid
const onSubmit = async (e, uid, fileUrl, setFileUrl, nweet, setNweet) => {
    e.preventDefault();
    try {
        let dataUrl = "";
        if (fileUrl) {
            const ref = storageService.ref().child(`${uid}/${uuidv4()}`);
            const response = await ref.putString(fileUrl, 'data_url');
            dataUrl = await response.ref.getDownloadURL();
            setFileUrl(null);
        }
        await dbService.collection(collection).add({
            nweet,
            createAt: Date.now(),
            creatorID: uid,
            dataUrl,
        });
    } catch (e) {
        console.log(e);
    }
    setNweet('');
};

const clearImg = (setFileUrl) => {
    setFileUrl(null);
};

const getNweets = (setNweets) => {
    dbService.collection(collection).onSnapshot(snapshot => {
        const nweetArray = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        setNweets(nweetArray);
    });
};

const propsCreateFn = (userObj, setNweet, setNweets, fileUrl, setFileUrl, nweet, nweets) => ({
    userObj,
    onChange: (e) => onChange(e, setNweet),
    onSubmit: (e) => onSubmit(e, userObj.uid, fileUrl, setFileUrl, nweet, setNweet),
    onFileChange: (e) => onFileChange(e, setFileUrl),
    clearImg: () => clearImg(setFileUrl),
    getNweets: () => getNweets(setNweets),
    nweets,
    nweet,
    fileUrl
});

export default propsCreateFn;