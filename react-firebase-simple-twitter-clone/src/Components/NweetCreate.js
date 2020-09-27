import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

function NweetCreate({ onChange, onSubmit, onFileChange, nweet, fileUrl, clearImg }) {
    return (
        <>
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
                <label htmlFor="attach-file" className="factoryInput__label">
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
        </>
    );
}

export default NweetCreate;