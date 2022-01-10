import React from 'react';

import { useAuthListener } from './useAuthHook';

// import Spinner from '../Spinner';
import Unauthorized from './Unauthorized/Unauthorized';

const ProtectedRoute = ({ component: Component }) => {
  // a custom hook to keep track of user's auth status
  const { loggedIn, checkingStatus } = useAuthListener();

  return (
    <>
      {
        // display a spinner while auth status being checked
        checkingStatus
          ? <h1 >Waiting </h1>
          : loggedIn
            // if user is logged in, grant the access to the route
            // note: in this example component is Bar
            ? <Component />
            // else render an unauthorised component
            // stating the reason why it cannot access the route
            : <Unauthorized />
      }
    </>
  );
};

export default ProtectedRoute;
