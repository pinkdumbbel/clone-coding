import React from 'react';
import { ChatWrapper } from '@components/Chat/styles';
import gravatar from 'gravatar';
import { IDM } from '@src/types/db';
import dayjs from 'dayjs';

interface Props {
    data: IDM;
}

function Chat({ data }: Props) {

    const user = data.Sender;

    return (
        <ChatWrapper>
            <div className="chat-img">
                <img src={gravatar.url(user.email, { s: '36px', d: 'retro' })} alt={user.nickname} />
            </div>
            <div className="chat-text">
                <div className="chat-user">
                    <b>{user.nickname}</b>
                    <span>{dayjs(data.createdAt).format('h:mmA')}</span>
                </div>
                <p>{data.content}</p>
            </div>
        </ChatWrapper>
    );
}

export default Chat;