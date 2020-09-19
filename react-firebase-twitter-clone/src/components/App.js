import React, { useEffect, useState } from 'react';
import AppRouter from './Router';
import { authService } from '../firebase';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      (user) ? setIsLoggedIn(true) : setIsLoggedIn(false);
      setInit(true);
      setUserObj(user);
    });
  }, []);

  return (
    <>
      { init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} /> : 'initializing...'}
    </>
  );
}

export default App;
