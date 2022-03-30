// import logo from './logo.svg';
import './App.css';

import { Redirect, Route, Switch } from 'react-router-dom';
import firebase from 'firebase/app';

import Login from './components/Login/Login.js';
import Permissions from './components/Permissions/Permissions.js';
import Unauthorized from './components/Unauthorized/Unauthorized.js';
import Admin from './components/Admin/Admin.js';
import Header from './components/Header/Header.js'
import Profile from './components/Profile/Profile.js'
import Support from './components/Support/Support.js'
import UpgradeNav from './components/NavComplete/UpgradeNav.js'
import ForgotPassword from './components/ForgotPassword/ForgotPassword.js'

import { AuthContextProvider, useAuthState, getAuth }from './firebase'
// import firebase
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';


import React, { useState, useEffect } from 'react';

// **** DO NOT DELETE OR COMMENT OUT-- ignore linter
// import firebase, { auth } from 'firebase';
// **** DO NOT DELETE OR COMMENT OUT



function App(props) {
  const [currentUser, setCurrentUser] = useState('');

  // let email = firebase.auth().currentUser ? firebase.auth().currentUser.email : false

  useEffect(() => {
    console.log(firebase.auth().currentUser)
    setCurrentUser(firebase.auth().currentUser)
  }, [])

  // const AuthenticatedRoute = ({ conponent: C, ...props }) => {
  //   // const { isAuthenticated } = useAuthState()
  //   // console.log('App scope', JSON.stringify(getAuth))
  //   return (
  //     <Route
  //     {...props}
  //     render={routeProps =>
  //       currentUser ? <C /> : <Redirect to="/login" />}
  //       />
  //     )
  //   }
  //   const UnauthenticatedRoute = ({ conponent: C, ...props }) => {
  //     // const { isAuthenticated } = useAuthState()
  //     // console.log(isAuthenticated)
  //     // console.log('App scope', JSON.stringify(getAuth))
  //     return (
  //       <Route
  //       {...props}
  //       render={routeProps =>
  //         !currentUser ? <C /> : <Redirect to="/upgradetool" />}
  //         />
  //       )
  //     }

  // clearing local storage for when working on the same dev port as other projects
  // useEffect(() => {
  //   localStorage.clear()
  // }, [])

  return (
    // <AuthProvider>
    <div className="App-wrapper">
    <p style={{ zIndex: 99999, fontSize:'8px', position: 'absolute', top: '0', left: '4px', color: 'grey'}}> v 0.3.8.B</p>
    <AuthContextProvider>

        <Switch>
          <Route path="/header"
          component={Header} />

          <PublicRoute
          path='/login'
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          component={ Login } />

          <PublicRoute
          path="/forgot-password"
          component={ ForgotPassword } />

    {
    // start of private routes
    }
            <PrivateRoute exact path='/admin'
            currentUser={currentUser}
            component={ Admin }/>

            <PrivateRoute exact path='/profile'
            currentUser={currentUser}
            component={ Profile }/>

            <PrivateRoute path="/upgradetool"
            component={ UpgradeNav } />

            <PrivateRoute exact path='/permissions'
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
            component={ Permissions  }/>

            <PrivateRoute exact path='/Support'
              currentUser={currentUser}
              component={ Support } />
    {
    // end of private routes
    }

          <Route exact path='/unauthorized'
          component={Unauthorized}/>


        </Switch>
    </AuthContextProvider>
    </div>
  );
}

export default App;
