import React, { useCallback, useEffect, useRef } from 'react';
import { ChatArea, Form, MentionsTextarea, Toolbox, SendButton, EachMention } from '@components/ChatBox/styles';
import autosize from 'autosize';
import { Mention, MentionProps, OnChangeHandlerFunc, SuggestionDataItem } from 'react-mentions';
import useSWR from 'swr';
import { useParams } from 'react-router';
import fetcher from '@src/utils/fetcher';
import { IUser } from '@src/types/db';
import gravatar from 'gravatar';

interface Props {
    chat: string;
    onSubmitForm: (e: any) => void;
    onChangeChat: (e: any) => void;
    placeholder: string;
}

function ChatBox({ chat, onSubmitForm, onChangeChat, placeholder }: Props) {
    const { workspace, id } = useParams<{ workspace: string; id: string }>();
    const { data: userData } = useSWR<IUser>(`/api/workspaces/${workspace}/users/${id}`, fetcher);
    const { data: memberData } = useSWR<IUser[]>(userData ? `/api/workspaces/${workspace}/members` : null, fetcher);

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (textareaRef.current) {
            autosize(textareaRef.current);
        }
    }, [textareaRef.current]);

    const onkeyDownChat = useCallback((e: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            onSubmitForm(e);
        }
    }, [onSubmitForm])

    const renderSuggestion = useCallback((
        suggestion: SuggestionDataItem,
        search: string,
        highlightedDisplay: React.ReactNode,
        index: number,
        focused: boolean): React.ReactNode => {
        if (!memberData) return null;

        return (
            <EachMention focus={focused}>
                <img src={gravatar.url(memberData[index].email, { s: '20px', d: 'retro' })} alt={memberData[index].nickname} />
                <span>{highlightedDisplay}</span>
            </EachMention>
        )
    }, [memberData])

    return (
        <ChatArea>
            <Form onSubmit={onSubmitForm}>
                <MentionsTextarea
                    value={chat}
                    onChange={onChangeChat}
                    onKeyDown={onkeyDownChat}
                    placeholder={placeholder}
                    inputRef={textareaRef}
                    allowSuggestionsAboveCursor
                >
                    <Mention
                        appendSpaceOnAdd
                        trigger='@'
                        data={memberData?.map((member) => ({ id: member.id, display: member.nickname })) || []}
                        renderSuggestion={renderSuggestion}
                    />
                </MentionsTextarea>

                <Toolbox>
                    <SendButton
                        className={
                            'c-button-unstyled c-icon_button c-icon_button--light c-icon_button--size_medium c-texty_input__button c-texty_input__button--send' +
                            (chat?.trim() ? '' : ' c-texty_input__button--disabled')
                        }
                        data-qa="texty_send_button"
                        aria-label="Send message"
                        data-sk="tooltip_parent"
                        type="submit"
                        disabled={!chat?.trim()}
                    >
                        <i className="c-icon c-icon--paperplane-filled" aria-hidden="true" />
                    </SendButton>
                </Toolbox>
            </Form>
        </ChatArea>
    )
}

export default ChatBox;