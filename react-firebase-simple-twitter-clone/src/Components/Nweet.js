import React, { useState } from 'react';
import { dbService, storageService } from '../firebase';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

function Nweet({ nweet, isOwned }) {
    const collection = 'twitterClone';

    const [edit, setEdit] = useState(false);
    const [text, setText] = useState('');

    const onDeleteClick = async () => {
        const ok = window.confirm('정말 삭제 하시겠습니까?');
        if (ok) {
            //삭제 컬렉션 doc가 먼저 삭제되면 url을 읽을수 없으므로 파일 먼저 삭제
            if (nweet.dataUrl) {
                await storageService.refFromURL(nweet.dataUrl).delete();
            }
            await dbService.collection(collection).doc(nweet.id).delete();
        }
    };

    const onEditClick = () => {
        setEdit(!edit);
    };

    const onEditSubmit = async (e) => {
        e.preventDefault();
        await dbService.collection(collection).doc(nweet.id).update({
            nweet: text
        });
        setEdit(!edit);
    };

    const onChange = (e) => {
        const { target: { value } } = e;
        setText(value);

    };
    return (
        <div className="nweet">
            {
                (edit) ? (
                    <>
                        <form onSubmit={onEditSubmit} className="container nweetEdit">
                            <input
                                type='text'
                                placeholder="Edit your nweet"
                                value={text}
                                onChange={onChange}
                                autoFocus
                                className="formInput"
                            />
                            <input type="submit" value="Update Nweet" className="formBtn" />
                        </form>
                        <span onClick={onEditClick} className="formBtn cancelBtn">
                            Cancel
                        </span>
                    </>) :
                    (
                        <>
                            <h3>{nweet.nweet}</h3>
                            {nweet.dataUrl && <img src={nweet.dataUrl} alt="" />}
                            {isOwned && (
                                <>
                                    <div className="nweet__actions">
                                        <span onClick={onDeleteClick}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </span>
                                        <span onClick={onEditClick}>
                                            <FontAwesomeIcon icon={faPencilAlt} />
                                        </span>
                                    </div>
                                </>
                            )}
                        </>)
            }
        </div>
    );
}

export default Nweet;