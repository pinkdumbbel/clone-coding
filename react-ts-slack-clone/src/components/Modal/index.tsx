import React from 'react';
import {CloseModalButton, CreateModal} from './styles';

interface Props {
    children: React.ReactNode;
    show: boolean;
    onCloseModal: () => void;
}

function Modal({children, show, onCloseModal}: Props) {
    const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

    if(!show) return null;

    return(
        <CreateModal>
            <div onClick={stopPropagation}>
                <CloseModalButton onClick={onCloseModal}>&times;</CloseModalButton>
                {children}
            </div>
        </CreateModal>
    )
}

export default Modal;


