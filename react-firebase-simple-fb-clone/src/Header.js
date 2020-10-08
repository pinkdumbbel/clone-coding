import React from 'react';
import './Header.css';
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import OndemandVideoIcon from '@material-ui/icons/OndemandVideo';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import GamesIcon from '@material-ui/icons/Games';
import { Avatar, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ForumOutlinedIcon from '@material-ui/icons/ForumOutlined';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function Header() {
    return (
        <div className='header'>
            <div className='header__left'>
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/150px-Facebook_f_logo_%282019%29.svg.png"
                    alt=""
                />
                <div className='header__input'>
                    <SearchIcon />
                    <input type='text' placeholder='Facebook 검색' />
                </div>
            </div>

            <div className='header__middle'>
                <div className='header__option'>
                    <HomeIcon fontSize='large' />
                </div>

                <div className='header__option'>
                    <PeopleOutlineIcon fontSize='large' />
                </div>

                <div className='header__option'>
                    <OndemandVideoIcon fontSize='large' />
                </div>

                <div className='header__option'>
                    <SupervisedUserCircleIcon fontSize='large' />
                </div>

                <div className='header__option'>
                    <GamesIcon fontSize='large' />
                </div>
            </div>

            <div className='header__right'>
                <div className='header__info'>
                    <Avatar />
                    <h4>최창열</h4>
                </div>
                <IconButton>
                    <AddIcon fontSize='large' />
                </IconButton>

                <IconButton>
                    <ForumOutlinedIcon fontSize='large' />
                </IconButton>

                <IconButton>
                    <NotificationsActiveIcon fontSize='large' />
                </IconButton>

                <IconButton>
                    <ExpandMoreIcon fontSize='large' />
                </IconButton>

            </div>
        </div>
    );
}

export default Header;;