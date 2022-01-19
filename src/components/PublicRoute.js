import React from 'react';

import { useAuthListener } from './useAuthHook';

// import Spinner from '../Spinner';
// import UpgradeNav from './NavComplete/UpgradeNav'
import { Redirect, withRouter } from 'react-router-dom'

const PublicRoute = ({ component: Component }) => {
  // a custom hook to keep track of user's auth status
  const { loggedIn, checkingStatus } = useAuthListener();

  return (
    <>
      {
        // display a spinner while auth status being checked
        checkingStatus
          ? (
            <div id="spinner">
            <div class="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            <p id="spinner-tip">Authorizing...</p>
            </div>
          )
          : !loggedIn
            // if user is logged in, grant the access to the route
            // note: in this example component is Bar
            ? <Component />
            // else render an unauthorised component
            // stating the reason why it cannot access the route
            : <Redirect to='/upgradetool' />
      }
    </>
  );
};

export default withRouter(PublicRoute);
