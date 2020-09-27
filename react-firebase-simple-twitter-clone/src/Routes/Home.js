import React from 'react';
import Nweet from '../Components/Nweet';
import NweetCreate from '../Components/NweetCreate';

function Home({ homeProps }) {

    const { userObj, onChange, onSubmit, onFileChange, clearImg, nweets, nweet, fileUrl } = homeProps;

    return (
        <div className="container">
            <NweetCreate
                onChange={onChange}
                onSubmit={onSubmit}
                onFileChange={onFileChange}
                nweet={nweet}
                fileUrl={fileUrl}
                clearImg={clearImg}
            />
            <div style={{ marginTop: 30 }}>
                {
                    nweets.map(nweet =>
                        <Nweet
                            key={nweet.id}
                            nweet={nweet}
                            isOwned={nweet.creatorID === userObj.uid ? true : false}
                        />)
                }
            </div>
        </div>
    );
}

export default Home;