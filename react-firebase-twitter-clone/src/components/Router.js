import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Auth from '../routes/Auth';
import Home from '../routes/Home';
import Profile from '../routes/Profile';
import Navigation from './Navigation';

const AppRouter = ({ isLoggedIn, userObj }) => {

    return (
        <Router>
            <Switch>
                {
                    isLoggedIn ?
                        (
                            <>
                                <Navigation userObj={userObj} />
                                <Route exact path='/'><Home userObj={userObj} /></Route>
                                <Route exact path='/Profile' component='Profile'><Profile userObj={userObj} /></Route>
                            </>
                        )
                        :
                        <Route exact path='/'><Auth /></Route>
                }
            </Switch>
        </Router>
    );
};

export default AppRouter;