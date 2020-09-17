import React, { useEffect, useState } from 'react';
import { dbService } from '../firebase';

function Home() {
    const collection = 'twitterClone';
    const [nweet, setNweet] = useState('');
    const [nweets, setNweets] = useState([]);

    const dbNweet = () => {
        const data = dbService.collection(collection).get();
        data.then(querySnapShot => querySnapShot.forEach(result => {
            const newObject = {
                ...result.data(),
                id: result.id
            };
            setNweets(prev => [newObject, ...prev]);
        }
        ));
    };
    const onChange = (e) => {
        setNweet(e.target.value);
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await dbService.collection(collection).add({
                nweet,
                createAt: Date.now()
            });
            dbNweet();
        } catch (e) {
            console.log(e);
        }
        setNweet('');
    };

    useEffect(() => {
        dbNweet();
    }, []);

    console.log(nweets);
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
                    type='submit'
                    value='Nweet'
                />
            </form>
            <div>
                {
                    nweets.map(nweet => <h3 key={nweet.id}>{nweet.nweet}</h3>)
                }
            </div>
        </div>
    );
}

export default Home;