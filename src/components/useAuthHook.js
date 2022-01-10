import { useEffect, useState } from 'react';

import { getAuth } from  '../firebase';

export const useAuthListener = (): void => {
  // assume user to be logged out
  const [loggedIn, setLoggedIn] = useState(false);

  // keep track to display a spinner while auth status is being checked
  const [checkingStatus, setCheckingStatus] = useState(true);

  useEffect(() => {
    // auth listener to keep track of user signing in and out
    getAuth.onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
      }

      setCheckingStatus(false);
    });
  }, []);

  return { loggedIn, checkingStatus };
};
