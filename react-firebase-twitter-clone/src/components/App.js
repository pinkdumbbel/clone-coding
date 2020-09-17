import React, { useEffect, useState } from 'react';
import AppRouter from './Router';
import { authService } from '../firebase';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      (user) ? setIsLoggedIn(true) : setIsLoggedIn(false);
      setInit(true);
    });
  }, []);

  return (
    <>
      { init ? <AppRouter isLoggedIn={isLoggedIn} /> : 'initializing...'}
    </>
  );
}

export default App;
