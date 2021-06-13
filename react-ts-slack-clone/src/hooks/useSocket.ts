import axios from 'axios';
import { useCallback } from 'react';
import io from 'socket.io-client';

type ReturnType = [SocketIOClient.Socket | undefined, () => void];

const backUrl = 'http://localhost:3095';

const sockets: { [key: string]: SocketIOClient.Socket } = {};

const useSocket = (workspace?: string): ReturnType => {

    const disconnect = () => {
        if (workspace) {
            sockets[workspace].disconnect();
            delete sockets[workspace];
        }
    }

    /* const disconnect = useCallback(() => {
        if (workspace) {
            sockets[workspace].disconnect();
            delete sockets[workspace];
        }
    }, [workspace]); */

    if (!workspace) {
        return [undefined, disconnect];
    }


    if (!sockets[workspace]) {
        sockets[workspace] = io.connect(`${backUrl}/ws-${workspace}`, {
            transports: ['websocket']
        });
    }

    return [sockets[workspace], disconnect]
}

export default useSocket;