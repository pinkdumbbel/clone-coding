import React, { Dispatch, SetStateAction, useCallback } from 'react';
import Modal from '../Modal';
import { Button, Input, Label } from '@src/pages/SignUp/styles';
import inputUser from '../../hooks/inputUser';
import axios from 'axios';
import { useParams } from 'react-router';
import loadable from '@loadable/component';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import fetcher from '@src/utils/fetcher';
import { IChannel, IUser } from '@src/types/db';

interface Props {
  show: boolean;
  onCloseModal: () => void;
  setShowCreateChannelModal: (flag: boolean) => void;
}
function CreateChannelModal({ show, onCloseModal, setShowCreateChannelModal }: Props) {
  const { workspace } = useParams<{ workspace: string }>();

  const { data: userData } = useSWR<IUser | false>('/api/users', fetcher)
  const { revalidate: revalidateChannel } = useSWR<IChannel[]>(
    userData ? `/api/workspaces/${workspace}/channels` : null,
    fetcher
  );

  const [newChannel, onChangeNewChannel, setNewChannel] = inputUser('');

  const onCreateChannel = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newChannel) {

      axios.post(`/api/workspaces/${workspace}/channels`, {
        name: newChannel
      }, {
        withCredentials: true
      })
        .then(() => {
          setShowCreateChannelModal(false);
          revalidateChannel();
          setNewChannel('');
        })
        .catch((e) => {
          console.dir(e);
          toast.error(e.response.data, { position: 'bottom-center' })
        });
    }
  }, [newChannel]);

  if (!show) return null;

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