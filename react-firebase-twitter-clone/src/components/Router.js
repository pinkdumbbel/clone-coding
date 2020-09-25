import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import HomeContainer from '../Container/HomeContainer';
//import Profile from '../Routes/Profile';
import Navigation from './Navigation';
import ProfileContainer from '../Container/ProfileContainer';
import AuthContainer from '../Container/AuthContainer';

const AppRouter = ({ isLoggedIn, userObj, refreshUser }) => {

    return (
        <Router>
            <Switch>
                {
                    isLoggedIn ?
                        (
                            <>
                                <Navigation userObj={userObj} />
                                <Route exact path='/'><HomeContainer userObj={userObj} /></Route>
                                <Route exact path='/Profile'><ProfileContainer userObj={userObj} refreshUser={refreshUser} /></Route>
                            </>
                        )
                        :
                        <Route exact path='/'><AuthContainer /></Route>
                }
            </Switch>
        </Router>
    );
};

export default AppRouter;