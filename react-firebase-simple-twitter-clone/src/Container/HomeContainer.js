import React, { useEffect, useState } from 'react';
import Home from '../Routes/Home';
import propsCreateFn from '../Module/HomeFunction';

function HomeContainer({ userObj }) {
    const [nweet, setNweet] = useState('');
    const [nweets, setNweets] = useState([]);
    const [fileUrl, setFileUrl] = useState(null);

    const homeProps = propsCreateFn(userObj, setNweet, setNweets, fileUrl, setFileUrl, nweet, nweets);


    useEffect(() => {
        homeProps.getNweets();
        // eslint-disable-next-line
    }, []);

    return (
        <Home homeProps={homeProps} />
    );
}

export default HomeContainer;