import React, { useCallback, useEffect, useState } from 'react';
import { Container, Header } from '@pages/DirectMessage/styles';
import gravatar from 'gravatar';
import useSWR from 'swr';
import { useParams } from 'react-router';
import { IDM, IUser } from '@src/types/db';
import fetcher from '@src/utils/fetcher';
import ChatBox from '@components/ChatBox';
import ChatList from '@components/ChatList';
import axios from 'axios';
import inputUser from '@hooks/inputUser';
import useSocket from '@hooks/useSocket';
import { OnChangeHandlerFunc } from 'react-mentions';
//import { toast } from 'react-toastify';

function DirectMessage() {
    const { workspace, id } = useParams<{ workspace: string; id: string }>();
    const userDataUrl = `/api/workspaces/${workspace}/users/${id}`;
    const chatDataUrl = `/api/workspaces/${workspace}/dms/${id}/chats?perPage=20&page=1`;

    const { data: userData } = useSWR<IUser>(userDataUrl, fetcher);
    const { data: chatData, revalidate: chatRevalidate } = useSWR<IDM[]>(chatDataUrl, fetcher);

    const [chat, onChangeChat, setChat] = inputUser<string, OnChangeHandlerFunc>('');


    const onSubmitForm = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (chat) {
            axios.post(`/api/workspaces/${workspace}/dms/${id}/chats`, {
                content: chat
            })
                .then(() => {
                    chatRevalidate();
                })
                .catch((error) => console.log(error));

        }
        setChat('');
    }, [chat])

    if (!userData) return null;

    return (
        <Container>
            <Header>
                <img src={gravatar.url(userData?.email, { s: '24px', d: 'retro' })} alt={userData.nickname} />
                <span>{userData.nickname}</span>
            </Header>
            <ChatList chatData={chatData} />
            <ChatBox chat={chat} onSubmitForm={onSubmitForm} onChangeChat={onChangeChat} placeholder='' />
        </Container>
    )
}

export default DirectMessage;
