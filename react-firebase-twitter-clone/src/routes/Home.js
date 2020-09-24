import React, { useEffect, useState } from 'react';
import Nweet from '../components/Nweet';
import { v4 as uuidv4 } from 'uuid';
import { dbService, storageService } from '../firebase';

function Home({ userObj }) {
    const collection = 'twitterClone';
    const [nweet, setNweet] = useState('');
    const [nweets, setNweets] = useState([]);
    const [fileUrl, setFileUrl] = useState(null);

    /* const dbNweet = () => {
        const data = dbService.collection(collection).get();
        data.then(querySnapShot => querySnapShot.forEach(result => {
            const newObject = {
                ...result.data(),
                id: result.id
            };
            setNweets(prev => [newObject, ...prev]);
        }
        ));
    }; */
    const onChange = (e) => {
        setNweet(e.target.value);
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            let dataUrl = "";
            if (fileUrl) {
                const ref = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
                const response = await ref.putString(fileUrl, 'data_url');
                dataUrl = await response.ref.getDownloadURL();
                setFileUrl(null);
            }
            await dbService.collection(collection).add({
                nweet,
                createAt: Date.now(),
                creatorID: userObj.uid,
                dataUrl,
            });
        } catch (e) {
            console.log(e);
        }
        setNweet('');
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

    const clearImg = () => {
        setFileUrl(null);
    };

    useEffect(() => {
        dbService.collection(collection).onSnapshot(snapshot => {
            const nweetArray = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setNweets(nweetArray);
        });
    }, []);

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    type='text'
                    placeholder="what's on your mind?"
                    maxLength={120}
                    onChange={onChange}
                    value={nweet}
                />
                <input
                    type='file'
                    accept='image/*'
                    onChange={onFileChange}
                />
                <input
                    type='submit'
                    value='Nweet'
                />
            </form>
            {
                fileUrl && (
                    <div>
                        <img src={fileUrl} alt="" width="50px" height="50px" />
                        <button onClick={clearImg}>Celar</button>
                    </div>
                )
            }
            {
                nweets.map(nweet =>
                    <Nweet
                        key={nweet.id}
                        nweet={nweet}
                        isOwned={nweet.creatorID === userObj.uid ? true : false}
                    />)
            }
        </div>
    );
}

export default Home;