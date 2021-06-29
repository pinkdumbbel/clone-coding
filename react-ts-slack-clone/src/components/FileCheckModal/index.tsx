import Modal from '@components/Modal';
import React, { DragEvent, useCallback, useState } from 'react';
import {FileCheck, FileList} from '@components/FileCheckModal/styles';
import axios from 'axios';
import { useParams } from 'react-router';
import FileSetting from '@hooks/fileSetting';

interface Props {
    show: boolean;
    setFileCheckModal: (flag: boolean) => void;
    setDragging: (flag: boolean) => void;
    e?: DragEvent<HTMLDivElement>
    revalidate: () => Promise<boolean>;
    messageFrom: string
}

function FileCheckModal({show, setFileCheckModal, setDragging, e, revalidate, messageFrom}: Props) {
    const [formData, fileName] = FileSetting(e);
    const {workspace, channel, id } = useParams<{workspace: string, channel: string, id:string}>();
    const paramOfMessageFrom = messageFrom==='channels' ? channel : id;

    const onFileSend = useCallback(() => {
        if(formData.get('image')) {
            localStorage.setItem(`${workspace}-${paramOfMessageFrom}`, new Date().getTime().toString());
            axios.post(`/api/workspaces/${workspace}/${messageFrom}/${paramOfMessageFrom}/images`, formData)
            .then(() => {
                localStorage.setItem(`${workspace}-${paramOfMessageFrom}`, new Date().getTime().toString());
                revalidate();
            })
            .catch((e) => {
                console.log(e);
            })
        }
        setFileCheckModal(false);
        setDragging(false);
    },[formData, workspace, paramOfMessageFrom, revalidate]);

    const onCancel = useCallback(() => {
        setFileCheckModal(false);
        setDragging(false);
    },[]);

    const onCloseModal = useCallback(() => {
        setFileCheckModal(false);
    }, []);
    
    return(
        <Modal show={show} onCloseModal={onCloseModal}>
            <h1>보내는 파일</h1>

            <FileList>
                <li><h3>{fileName ? fileName : '보내는 파일이 없습니다.' }</h3></li>
            </FileList>

            <FileCheck>
                <button onClick={onFileSend}>보내기</button>
                <button onClick={onCancel}>취소</button>
            </FileCheck>

        </Modal>
    )
}

export default FileCheckModal;
