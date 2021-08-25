// import logo from './logo.svg';
import './App.css';

import { Route, Switch } from 'react-router-dom';

import Login from './components/Login/Login.js';
import Permissions from './components/Permissions/Permissions.js';

// import AuthProvider from './contexts/AuthContexts';

function App() {
  return (
    // <AuthProvider>
    <div className="App-wrapper">
    <Switch>
    <Route path='/login' component={Login}/>

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
