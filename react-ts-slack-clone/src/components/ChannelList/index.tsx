import React, { useState } from 'react';
import { CollapseButton } from '@components/DMList/styles';
import { useParams } from 'react-router';
import useSWR from 'swr';
import fetcher from '@src/utils/fetcher';
import { IChannel, IUser } from '@src/types/db';
import { NavLink } from 'react-router-dom';

function ChannelList() {
    const { workspace } = useParams<{ workspace: string }>();

    const { data: userData } = useSWR<IUser>('/api/users', fetcher, {
        dedupingInterval: 2000, // 2초
    });

    const { data: channelData } = useSWR<IChannel[]>(
        userData ? `/api/workspaces/${workspace}/channels` : null,
        fetcher,
    );

    const [channelCollapse, setChannelCollapse] = useState(false);

    const toggleChannelCollapse = () => {
        setChannelCollapse(prev => !prev);
    }

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
                <span style={{ cursor: 'pointer' }} onClick={toggleChannelCollapse}>Channels</span>
            </h2>
            <div>
                {!channelCollapse &&
                    channelData?.map((channel) => {
                        return (
                            <NavLink
                                key={channel.name}
                                activeClassName="selected"
                                to={`/workspace/${workspace}/channel/${channel.name}`}
                            >
                                <span># {channel.name}</span>
                            </NavLink>
                        );
                    })}
            </div>
        </>
    );
}

export default ChannelList;