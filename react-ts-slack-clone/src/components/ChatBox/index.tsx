import React, { useCallback, useEffect, useRef } from 'react';
import { ChatArea, Form, MentionsTextarea, Toolbox, SendButton } from '@components/ChatBox/styles';
import autosize from 'autosize';

interface Props {
    chat: string;
    onSubmitForm: (e: any) => void;
    onChangeChat: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder: string;
}

function ChatBox({ chat, onSubmitForm, onChangeChat, placeholder }: Props) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (textareaRef.current) {
            autosize(textareaRef.current);
        }
    }, [textareaRef.current]);

    const onkeyDownChat = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            onSubmitForm(e);
        }
    }, [onSubmitForm])

    return (
        <ChatArea>
            <Form onSubmit={onSubmitForm}>
                <MentionsTextarea
                    value={chat}
                    onChange={onChangeChat}
                    onKeyDown={onkeyDownChat}
                    placeholder={placeholder}
                    ref={textareaRef}
                />

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