import Modal from '@components/Modal';
import React, { DragEvent, useCallback } from 'react';
import {FileCheck, FileList} from '@components/FileCheckModal/styles';
import axios from 'axios';
import { useParams } from 'react-router';

interface Props {
    show: boolean;
    onCloseModal: () => void;
    setFileCheckModal: (flag: boolean) => void;
    setDragging: (flag: boolean) => void;
    data?: FormData;
    revalidate: () => Promise<boolean>;
}

function FileCheckModal({show, onCloseModal, setFileCheckModal, setDragging, data, revalidate }: Props) {
    const {workspace, id} = useParams<{workspace: string, id: string}>();

    const onFileSend = useCallback(() => {
        if(data){
            axios.post(`/api/workspaces/${workspace}/dms/${id}/images`, data)
            .then(() => {
                revalidate();
                setDragging(false);
            });
        }

        setFileCheckModal(false);
        setDragging(false);
    },[data, workspace, id, revalidate]);

    const onCancel = useCallback(() => {
        setFileCheckModal(false);
        setDragging(false);
    },[]);

    return(
        <Modal show={show} onCloseModal={onCloseModal}>
            <h1>보내는 파일</h1>

            <FileList>
                <li><h3>가나다</h3></li>
            </FileList>

            <FileCheck>
                <button onClick={onFileSend}>보내기</button>
                <button onClick={onCancel}>취소</button>
            </FileCheck>

        </Modal>
    )
}

export default FileCheckModal;
