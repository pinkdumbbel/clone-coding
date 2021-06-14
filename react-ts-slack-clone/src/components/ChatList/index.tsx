import React, { LegacyRef, useCallback, useRef } from 'react';
import { ChatZone, Section } from '@components/ChatList/styles';
import { IDM } from '@src/types/db';
import Chat from '@components/Chat';
import { Scrollbars } from 'react-custom-scrollbars';

interface Props {
    chatData?: IDM[];
}

function ChatList({ chatData }: Props) {
    const scrollbarRef = useRef<Scrollbars>(null);

    const onScroll = useCallback(() => {

    }, []);

    return (
        <ChatZone>
            <Scrollbars autoHide ref={scrollbarRef} onScrollFrame={onScroll}>
                <Section>
                    {
                        chatData?.map((chat) => <Chat key={chat.id} data={chat} />)
                    }
                </Section>
            </Scrollbars>
        </ChatZone>
    )
}

export default ChatList;