import React, { useCallback, useEffect, useRef } from 'react';
import { Container, Header } from './styles';
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

function Channel() {
    const { workspace, channel } = useParams<{ workspace: string; channel: string }>();

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
    const [ socket ] = useSocket(workspace);

    const isEmpty = chatData?.[0]?.length===0;
    const isReachingEnd = isEmpty || (chatData && chatData[chatData.length-1].length<20) || false;

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

    useEffect(() => {
        socket?.on('message', onMessage);
        return () => {
            socket?.off('message', onMessage);
        };
    },[socket, onMessage])

    //로딩시 스크롤바 제일 아래로
    useEffect(() => {
        if(chatData?.length === 1){
            scrollbarRef.current?.scrollToBottom();
        }
    }, [chatData]);

    const onSubmitForm = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (chat) {
            chatMutate((prevChatData) => {
                if(myData && chatData && channelData){
                    prevChatData?.[0].unshift({
                        id: (chatData[0][0]?.id || 0) + 1,
                        UserId: myData.id,
                        User: myData,
                        content:  chat,
                        createdAt: new Date(),
                        ChannelId: channelData.id,
                        Channel: channelData
                    });
                    scrollbarRef.current?.scrollToBottom();
                }
                return prevChatData;
            }, false)
            .then(() => {
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

    const chatDateSection = makeDateSection(chatData ? [...chatData].flat().reverse() : []);

    if (!channelData || !myData) return null;

    return (
        <Container>
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
            <ChatBox chat={chat} onSubmitForm={onSubmitForm} onChangeChat={onChangeChat} placeholder='' />
        </Container>
    )
}

export default Channel;