import React from 'react';
import Nweet from '../Components/Nweet';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

function Home({ homeProps }) {

    const { userObj, onChange, onSubmit, onFileChange, clearImg, nweets, nweet, fileUrl } = homeProps;

    return (
        <div className="container">
            <form onSubmit={onSubmit} className="factoryForm">
                <div className="factoryInput__container">
                    <input
                        type='text'
                        placeholder="what's on your mind?"
                        maxLength={120}
                        className="factoryInput__input"
                        onChange={onChange}
                        value={nweet}
                    />
                    <input type="submit" value="&rarr;" className="factoryInput__arrow" />
                </div>
                <label for="attach-file" className="factoryInput__label">
                    <span>Add photos</span>
                    <FontAwesomeIcon icon={faPlus} />
                </label>
                <input
                    id="attach-file"
                    type='file'
                    accept='image/*'
                    onChange={onFileChange}
                    style={{
                        opacity: 0,
                    }}
                />
            </form>
            {
                fileUrl && (
                    <div className="factoryForm__attachment">
                        <img
                            src={fileUrl}
                            alt=""
                            style={{
                                backgroundImage: fileUrl,
                            }}
                        />
                        <div className="factoryForm__clear" onClick={clearImg}>
                            <span>Remove</span>
                            <FontAwesomeIcon icon={faTimes} />
                        </div>
                    </div>
                )
            }
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