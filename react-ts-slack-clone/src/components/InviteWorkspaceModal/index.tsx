import Modal from '@components/Modal';
import inputUser from '@hooks/inputUser';
import { Button, Input, Label } from '@src/pages/SignUp/styles';
import fetcher from '@src/utils/fetcher';
import axios from 'axios';
import React, { useCallback } from 'react';
import { useParams } from 'react-router';
import useSWR from 'swr';

interface Props {
  show: boolean,
  onCloseModal: () => void;
  setShowInviteWorkspaceModal: (flag: boolean) => void
};

function InviteWorkspaceModal({ show, onCloseModal, setShowInviteWorkspaceModal }: Props) {
  const { workspace } = useParams<{ workspace: string }>();
  const { revalidate: revalidateWorkspaceMember } = useSWR(`/api/workspaces/${workspace}/members`, fetcher);
  const [email, onChangeEmail, setEmail] = inputUser('');

  const onCreateChannel = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email) {
      axios.post(
        `/api/workspaces/${workspace}/members`,
        { email: email }
      )
        .then(() => {
          revalidateWorkspaceMember();
          setShowInviteWorkspaceModal(false);
          setEmail('');
        })
    }
  }, [email]);

  if (!show) return null;

  return (
    <Modal show={show} onCloseModal={onCloseModal}>
      <form onSubmit={onCreateChannel}>
        <Label id="email-label">
          <span>이메일</span>
          <Input id="email" value={email} onChange={onChangeEmail} />
        </Label>
        <Button type="submit">초대하기</Button>
      </form>
    </Modal>
  );
}

export default InviteWorkspaceModal;