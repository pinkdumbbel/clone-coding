import React from 'react';
import { ChatZone, Section } from '@components/ChatList/styles';
import { IDM } from '@src/types/db';

interface Props {
    chatData: IDM[];
}

function ChatList({ chatData }: Props) {
    console.log(chatData);

    return (
        <ChatZone>
            <Section>
                chatList
            </Section>
        </ChatZone>
    )
}

export default ChatList;