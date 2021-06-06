import axios from 'axios';
import React from 'react';
import { Redirect } from 'react-router';
import useSWR, { mutate } from 'swr';
import fetcher from './utils/fetcher';

function Workspace({children}: {children: React.ReactNode}) {
    const {data,error,revalidate,mutate} = useSWR('http://localhost:3095/api/users', fetcher);

    const onLogOut = () => {
        axios.post('http://localhost:3095/api/users/logout', null, {
            withCredentials:true
        }).then(() => {mutate(false), false});
    }

    if(!data){
        return <Redirect to='/login' />
    }
    return(
        <div>
            <button onClick={onLogOut}>로그아웃</button>
            {children}
        </div>
        
    )
}

export default Workspace;