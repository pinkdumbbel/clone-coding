import React, { Dispatch, SetStateAction, useCallback } from 'react';
import Modal from '../Modal';
import { Button, Input, Label } from '@src/pages/SignUp/styles';
import inputUser from '../../hooks/inputUser';
import axios from 'axios';
import { useParams } from 'react-router';
import loadable from '@loadable/component';

interface Props {
    show: boolean;
    onCloseModal: () => void;
    setShowCreateChannelModal: Dispatch<SetStateAction<boolean>>;
}
function CreateChannelModal({show, onCloseModal, setShowCreateChannelModal}: Props) {
    
    const [newChannel, onChangeNewChannel] = inputUser('');
    const { workspace, channel } = useParams<{ workspace: string; channel: string }>();

    console.log(workspace);

    const onCreateChannel = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(newChannel && !newChannel.trim()){
            axios.post(`http://localhost:3095/api/workspaces/${workspace}/channels`, {
                name:newChannel
            }, {
                withCredentials: true
            })
            .then(res => console.log(res));
        }
    },[newChannel]);

    if(!show) return null;

    return (
        <Modal show={show} onCloseModal={onCloseModal}>
          <form onSubmit={onCreateChannel}>
            <Label id="channel-label">
              <span>채널</span>
              <Input id="channel" value={newChannel} onChange={onChangeNewChannel} />
            </Label>
            <Button type="submit">생성하기</Button>
          </form>
        </Modal>
      );
}

export default CreateChannelModal;