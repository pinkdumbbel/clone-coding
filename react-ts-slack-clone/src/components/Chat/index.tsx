import React, { memo, useMemo } from 'react';
import { ChatWrapper } from '@components/Chat/styles';
import gravatar from 'gravatar';
import { IDM } from '@src/types/db';
import dayjs from 'dayjs';
import regexifyString from 'regexify-string';
import { Link, useParams } from 'react-router-dom';

interface Props {
    data: IDM;
}

function Chat({ data }: Props) {
    const { workspace } = useParams<{ workspace: string }>();

    console.log(data);

    const user = data.Sender;

    const regExp = /@\[(.+?)]\((\d+?)\)|\n/g;

    const result = useMemo(() => regexifyString({
        input: data.content,
        pattern: regExp,
        decorator: (match, index) => {
            const arr: string[] | null = match.match(/@\[(.+?)]\((\d+?)\)/)!;

            if (arr) {
                return (
                    <Link key={match + index} to={`/workspace/${workspace}/dm/${arr[2]}`}>
                        {arr[0]}
                    </Link>
                );
            }

            return <br key={index} />
        },
    }), [data.content]);

    return (
        <ChatWrapper>
            <div className="chat-img">
                <img src={gravatar.url(user.email, { s: '36px', d: 'retro' })} alt={user.nickname} />
            </div>
            <div className="chat-text">
                <div className="chat-user">
                    <b>{user.nickname}</b>
                    <span>{dayjs(data.createdAt).format('h:mm A')}</span>
                </div>
                <p>{result}</p>
            </div>
        </ChatWrapper>
    );
}

export default memo(Chat);