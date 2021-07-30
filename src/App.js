// import logo from './logo.svg';
import './App.css';

import { Route } from 'react-router-dom';

import Login from './components/Login/Login.js';
import Permissions from './components/Permissions/Permissions.js';

// import AuthProvider from './contexts/AuthContexts';

function App() {
  return (
    // <AuthProvider>
    <>
    <Route path='/login' render={() => (
        <Login />
      )}/>

      {
        // Authenticated
        // Route
      }

      <Route exact path='/permissions' render={() => (
          <Permissions />
        )}/>
        </>
     // </AuthProvider>
  );
}

export default App;
