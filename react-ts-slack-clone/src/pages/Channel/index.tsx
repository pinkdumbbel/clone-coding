import React, { DragEvent, useCallback, useEffect, useRef, useState } from 'react';
import { Container, Header, DragOver } from '@pages/Channel/styles';
import ChatList from '@components/ChatList';
import useSWR, { useSWRInfinite } from 'swr';
import { useParams } from 'react-router';
import fetcher from '@src/utils/fetcher';
import { IChannel, IChat, IUser } from '@src/types/db';
import Scrollbars from 'react-custom-scrollbars';
import { OnChangeHandlerFunc } from 'react-mentions';
import inputUser from '@hooks/inputUser';
import useSocket from '@hooks/useSocket';
import axios from 'axios';
import makeDateSection from '@src/utils/makeDateSection';
import ChatBox from '@components/ChatBox';
import FileCheckModal from '@components/FileCheckModal';

function Channel() {
    const { workspace, channel } = useParams<{ workspace: string; channel: string }>()
    const { data: myData } = useSWR('/api/users', fetcher);
    const { data: channelData } = useSWR<IChannel>(`/api/workspaces/${workspace}/channels/${channel}`, fetcher);
    const { data: channelMembersData } = useSWR<IUser[]>(
        myData ? `/api/workspaces/${workspace}/channels/${channel}/members` : null,
        fetcher,
    );

    const { data: chatData, mutate: chatMutate, revalidate: chatRevalidate, setSize } = useSWRInfinite<IChat[]>(
        (index) => `/api/workspaces/${workspace}/channels/${channel}/chats?perPage=20&page=${index + 1}`,
        fetcher,
    );



    const scrollbarRef = useRef<Scrollbars>(null);
    const [chat, onChangeChat, setChat] = inputUser<string, OnChangeHandlerFunc>('');
    const [dragging, setDragging] = useState(false);
    const [fileCheckModal, setFileCheckModal] = useState(false);
    const [dragEvent, setDragEvent] = useState<DragEvent<HTMLDivElement>>();
    const [socket] = useSocket(workspace);

    const isEmpty = chatData?.[0]?.length === 0;
    const isReachingEnd = isEmpty || (chatData && chatData[chatData.length - 1].length < 20) || false;

    const onMessage = useCallback((data: IChat) => {
        // id는 상대방 아이디
        if (data && data.UserId !== myData?.id && data.Channel.name === channel) {
            chatMutate((chatData) => {
                chatData?.[0].unshift(data);
                return chatData;
            }, false).then(() => {
                if (scrollbarRef.current) {
                    if (
                        scrollbarRef.current.getScrollHeight() <
                        scrollbarRef.current.getClientHeight() + scrollbarRef.current.getScrollTop() + 150
                    ) {
                        setTimeout(() => {
                            scrollbarRef.current?.scrollToBottom();
                        }, 50);
                    }
                }
            });
        }
    }, []);

    const onSubmitForm = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (chat) {
            chatMutate((prevChatData) => {
                if (myData && chatData && channelData) {
                    prevChatData?.[0].unshift({
                        id: (chatData[0][0]?.id || 0) + 1,
                        UserId: myData.id,
                        User: myData,
                        content: chat,
                        createdAt: new Date(),
                        ChannelId: channelData.id,
                        Channel: channelData
                    });
                    scrollbarRef.current?.scrollToBottom();
                }
                return prevChatData;
            }, false)
                .then(() => {
                    localStorage.setItem(`${workspace}-${channel}`, new Date().getTime().toString());
                    setChat('');
                    scrollbarRef.current?.scrollToBottom();
                })

            axios.post(`/api/workspaces/${workspace}/channels/${channel}/chats`, {
                content: chat
            })
                .then(() => {
                    chatRevalidate();
                })
                .catch((error) => console.log(error));

        }
        setChat('');
    }, [chat, myData, channelData, chatData, workspace])

    const onDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragging(true);
    }, [])

    const onDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragEvent(e);
        setFileCheckModal(true);
    }, [workspace, channel]);

    const onDragLeave = ((e: DragEvent<HTMLDivElement>) => {
        if (e.currentTarget.id === 'leave') setDragging(false);
    });

    useEffect(() => {
        socket?.on('message', onMessage);
        return () => {
            socket?.off('message', onMessage);
        };
    }, [socket, onMessage])

    //로딩시 스크롤바 제일 아래로
    useEffect(() => {
        if (chatData?.length === 1) {
            scrollbarRef.current?.scrollToBottom();
        }
    }, [chatData]);

    useEffect(() => {
        localStorage.setItem(`${workspace}-${channel}`, new Date().getTime().toString());
    }, [workspace, channel])

    const chatDateSection = makeDateSection(chatData ? [...chatData].flat().reverse() : []);

    if (!channelData || !myData) return null;

    return (
        <Container
            onDragOver={onDragOver}
            onDrop={onDrop}
        >
            <Header>
                <span>#{channel}</span>
                <div className='header-right'>
                    <span>{channelMembersData ? channelMembersData.length : 0}</span>
                    <button
                        //onClick={onClickInviteChannel}
                        className="c-button-unstyled p-ia__view_header__button"
                        aria-label="Add people to #react-native"
                        data-sk="tooltip_parent"
                        type="button"
                    >
                        <i className="c-icon p-ia__view_header__button_icon c-icon--add-user" aria-hidden="true" />
                    </button>
                </div>
            </Header>
            <ChatList
                chatDateSection={chatDateSection}
                ref={scrollbarRef}
                setSize={setSize}
                isReachingEnd={isReachingEnd}
            />
            {
                dragging &&
                <DragOver id='leave' onDragLeave={onDragLeave}>업로드!</DragOver>
            }
            <ChatBox chat={chat} onSubmitForm={onSubmitForm} onChangeChat={onChangeChat} placeholder='' />
            <FileCheckModal
                show={fileCheckModal}
                setFileCheckModal={setFileCheckModal}
                setDragging={setDragging}
                e={dragEvent}
                revalidate={chatRevalidate}
                messageFrom={'channels'}
            />

        </Container>
    )
}

export default Channel;