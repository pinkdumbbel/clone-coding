import React, { useEffect, useRef, useState } from 'react';
import SidebarRow from './SidebarRow';
import '../Css/Sidebar.css';
import { sideBarArray } from '../var';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

function Sidebar() {
    const [moreLoad, setMoreLoad] = useState(false);
    const [moreText, setMoreText] = useState('더 보기');
    const sidebar = useRef();

    let more = false;

    const moreLoading = () => {
        sidebar.current.style.height = 770;

        setMoreLoad(true);
        setMoreText('일부만 보기');

        if (moreLoad) {
            setMoreLoad(false);
            setMoreText('더 보기');
            sidebar.current.style.height = 555;
        }
    };

    return (
        <div className='sidebar' ref={sidebar}>
            {
                sideBarArray.map((side, index) => {
                    if (index === 10 && !moreLoad) {
                        more = true;
                    }
                    return (!more) && <SidebarRow key={side.id} side={side} more={more} />;
                })
            }
            <div className='sidebarRow sidebar__moreLoading' onClick={moreLoading}>
                <div className='sidebar__moreIcon'>
                    {moreLoad ? <ArrowDropUpIcon fontSize='small' /> : <ArrowDropDownIcon fontSize='small' />}
                </div>
                <div className='sidebar__moreText'>{moreText}</div>
            </div>
        </div>
    );
}

export default Sidebar;