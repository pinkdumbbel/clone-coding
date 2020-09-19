import React, { useState } from 'react';
import { dbService } from '../firebase';

function Nweet({ nweet, isOwned }) {
    const collection = 'twitterClone';

    const [edit, setEdit] = useState(false);
    const [text, setText] = useState('');

    const onDleteClick = async () => {
        const ok = window.confirm('정말 삭제 하시겠습니까?');
        console.log(ok);
        if (ok) {
            //삭제
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