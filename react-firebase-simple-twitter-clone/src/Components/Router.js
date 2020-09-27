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
            {isLoggedIn && <Navigation userObj={userObj} />}
            <Switch>
                <>
                    {
                        isLoggedIn ?
                            (
                                <div
                                    style={{
                                        maxWidth: 890,
                                        width: "100%",
                                        margin: "0 auto",
                                        marginTop: 80,
                                        display: "flex",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Route exact path='/'><HomeContainer userObj={userObj} /></Route>
                                    <Route exact path='/Profile'><ProfileContainer userObj={userObj} refreshUser={refreshUser} /></Route>
                                </div>
                            )
                            :
                            <Route exact path='/'><AuthContainer /></Route>
                    }
                </>
            </Switch>
        </Router>
    );
};

export default AppRouter;