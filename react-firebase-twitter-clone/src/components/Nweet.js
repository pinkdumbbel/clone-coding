import React, { useState } from 'react';
import { dbService, storageService } from '../firebase';

function Nweet({ nweet, isOwned }) {
    console.log(nweet);

    const collection = 'twitterClone';

    const [edit, setEdit] = useState(false);
    const [text, setText] = useState('');

    const onDleteClick = async () => {
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
        <div>
            {
                (edit) ? (
                    <>
                        <form onSubmit={onEditSubmit}>
                            <input
                                type='text'
                                value={text}
                                onChange={onChange}
                            />
                        </form>
                        <button onClick={onEditClick}>cancel</button>
                    </>) :
                    (
                        <>
                            <h3>{nweet.nweet}</h3>
                            {nweet.dataUrl && <img src={nweet.dataUrl} alt="" width="50px" height="50px" />}
                            {isOwned && (
                                <>
                                    <button onClick={onEditClick}>edit</button>
                                    <button onClick={onDleteClick}>delete</button>
                                </>
                            )}
                        </>)
            }
        </div>
    );
}

export default Nweet;