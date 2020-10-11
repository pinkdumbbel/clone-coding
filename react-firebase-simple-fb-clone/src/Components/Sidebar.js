import React, { useState } from 'react';
import SidebarRow from './SidebarRow';
import '../Css/Sidebar.css';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

const sideArray = [
    {
        id: '1',
        title: '최창열',
        avatar: true,
        src: ''
    },
    {
        id: '2',
        title: '코로나19 정보 센터',
        avatar: false,
        src: '/Img/corona.png'
    },
    {
        id: '3',
        title: '친구',
        avatar: false,
        src: '/Img/friends.png'
    },
    {
        id: '4',
        title: '그룹',
        avatar: false,
        src: '/Img/group.png'
    },
    {
        id: '5',
        title: '동영상',
        avatar: false,
        src: '/Img/video.png'
    },
    {
        id: '6',
        title: '이벤트',
        avatar: false,
        src: '/Img/event.png'
    },
    {
        id: '7',
        title: '과거의 오늘',
        avatar: false,
        src: '/Img/past.png'
    },
    {
        id: '8',
        title: '저장됨',
        avatar: false,
        src: '/Img/save.png'
    },
    {
        id: '9',
        title: '페이지',
        avatar: false,
        src: '/Img/page.png'
    },
    {
        id: '10',
        title: '채용정보',
        avatar: false,
        src: '/Img/hireinfo.png'
    },
    {
        id: '11',
        title: '게임',
        avatar: false,
        src: '/Img/game.png'
    },
    {
        id: '12',
        title: '게임 동영상',
        avatar: false,
        src: '/Img/gamevideo.png'
    },
    {
        id: '13',
        title: 'Messenger',
        avatar: false,
        src: '/Img/messenger.png'
    },

];

function Sidebar() {
    const [moreLoad, setMoreLoad] = useState(false);
    const [moreText, setMoreText] = useState('더 보기');
    let more = false;

    const moreLoading = () => {
        setMoreLoad(true);
        setMoreText('일부만 보기');

        if (moreLoad) {
            setMoreLoad(false);
            setMoreText('더 보기');
        }
    };

    return (
        <div className='sidebar'>
            {
                sideArray.map((side, index) => {
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