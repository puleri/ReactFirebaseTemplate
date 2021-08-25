import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { auth } from '../../firebase';

// import Button, { createRipple } from './Button'
// <Button />
import logo from "../../logo.svg";
import google from "./google.png";
import "./Login.css";
import "./Button.css"

// import { useAuth } from '../../contexts/AuthContexts';


export default function Login(props) {
    const match = useRouteMatch('/login');

    const [email, setEmail] = useState('');
    const [error, setError] = useState(null)
    const [password, setPassword] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const [redirect, setRedirect] = useState(false);

    // const { login } = useAuth()

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        setCurrentUser(user)
      })
      return unsubscribe
    }, [])

    function login(email, password) {
      return auth.signInWithEmailAndPassword(email, password)
    }


    const handleSubmit = (e) => {
      // console.log(email, " ", password)
      setError(null)
      login(email, password)
        .then((user = currentUser) => {
          // Line for Kaiser Admins
          if (user.user.email === "1@1.com") {
            return props.history.push('/permissions')
          }
          if (user != null) {
            return props.history.push('/template')
          }
          console.log(user)
        })
        .catch((error) => {
          setError('Username or password incorrect.')
        })
    }

  return (
      <div className="login-page">
        <div className="login-welcome">
          <h1 className="login-h1">Welcome <br/> Please sign in</h1>
          <h2 className="login-h2">If you need help signing in, please contact your administrator</h2>
        </div>
        <div className="circle1">
        </div>
        <div className="circle2">
        </div>
        <div className="login-form">
        <img alt="Kaiser White Logo -- The word 'Kaiser' with a roof on top" className="logo" src={logo} />
        <p className="error-message">{error}</p>
          <input onChange = {(e) => setEmail(e.target.value)} type="email" className="login-email" placeholder="Email:"/>
          <input onChange = {(e) => setPassword(e.target.value)} type="password" className="login-password" placeholder="Password:"/>
          <button className="pulse" onClick={handleSubmit}>Sign in</button>
          <h5 className="login-h5">Sign in with</h5>
          <img className="login-google" src={google} alt="Google sign in button" />
        </div>

      </div>
    )
  }
