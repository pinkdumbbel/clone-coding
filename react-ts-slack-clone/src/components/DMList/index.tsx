import React, { useCallback, useEffect, useState } from 'react';
import { CollapseButton } from '@components/DMList/styles';
import useSWR from 'swr';
import { IUser, IUserWithOnline } from '@src/types/db';
import fetcher from '@src/utils/fetcher';
import { useParams } from 'react-router';
import useSocket from '@hooks/useSocket';
import EachDM from '@components/EachDM';

function DMList() {
    const { workspace } = useParams<{ workspace: string }>();

    const { data: userData } = useSWR<IUser>('/api/users', fetcher, {
        dedupingInterval: 2000, // 2초
    });

    const { data: memberData } = useSWR<IUserWithOnline[]>(
        userData ? `/api/workspaces/${workspace}/members` : null,
        fetcher,
    );

    const [channelCollapse, setChannelCollapse] = useState(false);
    const [onlineList, setOnlineList] = useState<number[]>([]);
    const [socket] = useSocket(workspace);

    useEffect(() => {
        if (userData && memberData && socket) {
            socket.on('onlineList', (data: number[]) => {
                setOnlineList(data);
            });
        }

        return () => {
            socket?.off('onlineList');
        }
    }, [userData, memberData, socket]);

    const toggleChannelCollapse = useCallback(() => {
        setChannelCollapse((prev) => !prev);
    }, []);

    return (
        <>
            <h2>
                <CollapseButton collapse={channelCollapse} onClick={toggleChannelCollapse}>
                    <i
                        className="c-icon p-channel_sidebar__section_heading_expand p-channel_sidebar__section_heading_expand--show_more_feature c-icon--caret-right c-icon--inherit c-icon--inline"
                        data-qa="channel-section-collapse"
                        aria-hidden="true"
                    />
                </CollapseButton>
                <span style={{ cursor: 'pointer' }} onClick={toggleChannelCollapse}>Direct Messages</span>
            </h2>
            <div>
                {!channelCollapse &&
                    memberData?.map((member) => {
                        const isOnline = onlineList.includes(member.id);
                        return (
                            <EachDM 
                                key={member.id}
                                member={member}
                                isOnline={isOnline}
                            />
                        );
                    })}
            </div>
        </>
    );
}

export default DMList;