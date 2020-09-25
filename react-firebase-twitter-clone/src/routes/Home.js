import React from 'react';
import Nweet from '../Components/Nweet';

function Home({ homeProps }) {

    const { userObj, onChange, onSubmit, onFileChange, clearImg, nweets, nweet, fileUrl } = homeProps;

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