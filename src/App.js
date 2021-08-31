// import logo from './logo.svg';
import './App.css';

import { Route, Switch } from 'react-router-dom';

import Login from './components/Login/Login.js';
import Permissions from './components/Permissions/Permissions.js';
import React, { useState, useEffect } from 'react';
// import AuthProvider from './contexts/AuthContexts';
import { auth } from 'firebase';

function App(props) {
  const [currentUser, setCurrentUser] = useState(null);
  return (
    // <AuthProvider>
    <div className="App-wrapper">
    <Switch>
    <Route path='/login' currentUser={currentUser} setCurrentUser={setCurrentUser} component={Login}/>

      {
        // Authenticated
        // Route
      }

      <Route exact path='/permissions' component={Permissions}/>
    </Switch>
    </div>
     // </AuthProvider>
  );
}

export default App;
