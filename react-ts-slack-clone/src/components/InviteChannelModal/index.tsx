import React from 'react';

interface Props {
    show: boolean;
    onCloseModal: () => void;
    setShowInviteChannelModal: (flag: boolean) => void;
}


function InviteChannelModal({show, onCloseModal, setShowInviteChannelModal}: Props) {

    if(!show) return null;
    
    return(
        <div>

        </div>
    )
}

export default InviteChannelModal;