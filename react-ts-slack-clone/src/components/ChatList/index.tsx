import React, { useCallback, forwardRef, MutableRefObject } from 'react';
import { ChatZone, Section, StickyHeader } from '@components/ChatList/styles';
import Chat from '@components/Chat';
import { positionValues, Scrollbars } from 'react-custom-scrollbars';
import { DateSectionType } from '@src/utils/makeDateSection';
import { IDM } from '@src/types/db';

interface Props {
    chatDateSection: DateSectionType;
    setSize: (size: number | ((size: number) => number)) => Promise<IDM[][] | undefined>;
    isReachingEnd: boolean;

}

export default forwardRef<Scrollbars, Props>(function ChatList({ chatDateSection, setSize,  isReachingEnd }: Props, scrollRef) {

    const onScroll = useCallback((values: positionValues) => {
        const current = (scrollRef as MutableRefObject<Scrollbars>)?.current;
        if(values.scrollTop===0 && !isReachingEnd){
            setSize(prev => prev+1)
            .then(() => {
                if(current) current.scrollTop(current.getScrollHeight()-values.scrollHeight);
            })
            
        }
     }, []);

    return (
        <ChatZone>
            <Scrollbars autoHide ref={scrollRef} onScrollFrame={onScroll}>
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
})

/* export default ChatList; */