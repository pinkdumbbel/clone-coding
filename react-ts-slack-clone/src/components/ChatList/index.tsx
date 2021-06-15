import React, { useCallback, useRef } from 'react';
import { ChatZone, Section, StickyHeader } from '@components/ChatList/styles';
import { IDM } from '@src/types/db';
import Chat from '@components/Chat';
import { Scrollbars } from 'react-custom-scrollbars';
import { DateSectionType } from '@src/utils/makeDateSection';
import dayjs from 'dayjs';

interface Props {
    chatData?: IDM[];
    chatDateSection: DateSectionType;
}

function ChatList({ chatData, chatDateSection }: Props) {
    const scrollbarRef = useRef<Scrollbars>(null);
    const onScroll = useCallback(() => { }, []);

    return (
        <ChatZone>
            <Scrollbars autoHide ref={scrollbarRef} onScrollFrame={onScroll}>
                {
                    Object.entries(chatDateSection).map(([date, chats]) => {
                        return (<Section className={`section-${date}`} key={date}>
                            <StickyHeader>
                                <button>{date}</button>
                            </StickyHeader>
                            {
                                chats.map((chat) => {
                                    return <Chat key={chat.id} data={chat} />
                                })
                            }
                        </Section>)
                    })
                }
            </Scrollbars>
        </ChatZone>
    )
}

export default ChatList;