import React from 'react';
import { Link } from 'react-router-dom';

function Navigation({ userObj }) {

    console.log('Navigation!!!');

    return (
        <nav>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/Profile'>{userObj && userObj.displayName} Profile</Link></li>
            </ul>
        </nav>
    );
}

export default Navigation;