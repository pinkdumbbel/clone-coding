import React, { useEffect } from 'react';
import { IChannel } from '@src/types/db';
import fetcher from '@src/utils/fetcher';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import useSWR from 'swr';

interface Props {
    channel: IChannel;
}

function EachChannel({channel}: Props) {
    const {workspace} = useParams<{workspace: string}>();

    const date = localStorage.getItem(`${workspace}-${channel.name}`);
    const location = useLocation();
    const {data:count, mutate} = useSWR<number>(`/api/workspaces/${workspace}/channels/${channel.name}/unreads?after=${date}`, fetcher);

    useEffect(() => {
        if (location.pathname === `/workspace/${workspace}/channel/${channel.name}`) {
          mutate(0);
        }
      }, [mutate, location.pathname, workspace, channel]);

    return (
        <NavLink
            key={channel.name}
            activeClassName="selected"
            to={`/workspace/${workspace}/channel/${channel.name}`}
        >
            <span># {channel.name}</span>
            {(count && count > 0 && <span className="count">{count}</span>) || null}
        </NavLink>
    );
}

export default EachChannel;