import React from 'react';

import { Avatar, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    small: {
        width: theme.spacing(5),
        height: theme.spacing(5),
    },
}));

function SidebarRow({ side }) {
    const classes = useStyles();

    return (
        <>
            <div className='sidebarRow'>
                <div className='sidebarRow__img'>
                    {(side.avatar) && <Avatar className={classes.small} />}
                    {(side.src) && <img src={side.src} alt="" />}
                </div>
                <div className='sidebarRow__title'>
                    {side.title}
                </div>
            </div>
        </>
    );
}

export default SidebarRow;