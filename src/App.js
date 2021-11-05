// import logo from './logo.svg';
import './App.css';

import { Route, Switch } from 'react-router-dom';

import Login from './components/Login/Login.js';
import Permissions from './components/Permissions/Permissions.js';
import Unauthorized from './components/Unauthorized/Unauthorized.js';
import Admin from './components/Admin/Admin.js';
import Header from './components/Header/Header.js'
import UpgradeTool from './components/UpgradeTool/UpgradeTool.js'

import React, { useState, useEffect } from 'react';
// import AuthProvider from './contexts/AuthContexts';

// **** DO NOT DELETE OR COMMENT OUT-- ignore linter
import { auth } from 'firebase';
// **** DO NOT DELETE OR COMMENT OUT


function App(props) {
  const [currentUser, setCurrentUser] = useState(null);

  // clearing local storage for when working on the same dev port as other projects
  // useEffect(() => {
  //   localStorage.clear()
  // }, [])

  return (
    // <AuthProvider>
    <div className="App-wrapper">
    <Switch>
      <Route path="/header"
      component={Header} />

      <Route path="/upgradetool"
      component={UpgradeTool} />

      <Route path='/login' currentUser={currentUser}
      setCurrentUser={setCurrentUser}
      component={Login}/>

      <Route exact path='/permissions'
      currentUser={currentUser}
      setCurrentUser={setCurrentUser}
      component={Permissions}/>

      <Route exact path='/unauthorized'
      component={Unauthorized}/>


      <Route exact path='/admin'
      component={Admin}/>
    </Switch>
    </div>
     // </AuthProvider>
  );
}

export default App;
