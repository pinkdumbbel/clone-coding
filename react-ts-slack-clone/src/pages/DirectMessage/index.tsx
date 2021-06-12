import React, { useState } from 'react';
import { Container, Header } from '@pages/DirectMessage/styles';
import gravatar from 'gravatar';
import useSWR from 'swr';
import { useParams } from 'react-router';
import { IUser } from '@src/types/db';
import fetcher from '@src/utils/fetcher';
import ChatBox from '@components/ChatBox';
import ChatList from '@components/ChatList';
import axios from 'axios';
import inputUser from '@hooks/inputUser';

function DirectMessage() {
    const { workspace, id } = useParams<{ workspace: string; id: string }>();

    const { data: userData } = useSWR<IUser>(`/api/workspaces/${workspace}/users/${id}`, fetcher);
    const [chat, onChangeChat, setChat] = inputUser<string, HTMLTextAreaElement>('');

    const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (chat) {
            axios.post(`/api/workspaces/${workspace}/dms/${id}/chats`, {
                content: chat
            })
                .then((res) => console.log(res));

        }
        setChat('');
    }

    if (!userData) return null;

    return (
        <Container>
            <Header>
                <img src={gravatar.url(userData?.email, { s: '24px', d: 'retro' })} alt={userData.nickname} />
                <span>{userData.nickname}</span>
            </Header>
            <ChatList />
            <ChatBox chat={chat} onSubmitForm={onSubmitForm} onChangeChat={onChangeChat} />
        </Container>
    )
}

export default DirectMessage;
