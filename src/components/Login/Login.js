import React, { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import firebase, { auth } from '../../firebase';
// import { collection, query, where, getDocs } from "../../firebase";

// import Button, { createRipple } from './Button'
// <Button />
import logo from "../../logo.svg";
import google from "./google.png";
import "./Login.css";
import "./Button.css"

// import { useAuth } from '../../contexts/AuthContexts';


export default function Login(props) {
    const match = useRouteMatch('/login');

// this logic below needs to move to the app's global scope and passed as a prop
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null)
    const [password, setPassword] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const [redirect, setRedirect] = useState(false);

    // const { login } = useAuth()



    // useEffect(() => {
    //   const unsubscribe = auth.onAuthStateChanged(user => {
    //     setCurrentUser(user)
    //     console.log('USER is', user)
    //   })
    //
    //   return unsubscribe
    // }, [])

    function login(email, password) {
      // localStorage.setItem('user', email)
      auth.signInWithEmailAndPassword(email, password)
        .then((creds) => {
          // const user = creds.user;
          const userRef = firebase.firestore().collection('users').doc(creds.user.uid);
          const adminRef = firebase.firestore().collection('admin').doc(creds.user.uid);
          adminRef.get().then((admin) => {
            // reference for isAdmin?
            const isAdmin = admin.exists

            userRef.get()
            .then((user) => {
              // reference for isUser?
              const isUser = user.exists
              if (isUser)
              {
                firebase.firestore().collection('users').doc(creds.user.uid).set({
                  status: 'active',
                }, { merge: true })
                return props.history.push('/permissions')
              }

              if (isAdmin) {
                return props.history.push('admin')
              }

              else
              {
                props.history.push('/unauthorized')
                auth.signOut().then("Unauthorized").catch(err => console.log("Error:", err))
              }
            })
            .catch(err => console.log("Error getting document:", err))



              }
          )
          // check if user || admin || deactivated user

          // console.log(user)
          // console.log("firebase user is ", user)
        })
        .catch(err => console.err)
    }


    const handleSubmit = (e) => {
      // if login succesful
      if (login(email,password)) {
        // reset error if one exists
        setError(null)

        // console.log(email, " ", password)
        // query firestore for user
        const q = firebase.firestore().collection('users')
        q.get().then(querySnapshot => {
          const arrUser = querySnapshot.docs.map(d =>d.data())
          console.log('arrUSER ', arrUser)


          const tempUser = arrUser.find(el => el.email === email);
          console.log("temp user is", tempUser.first);
        })
      }
      else
      {
          return setError('Username or password incorrect.')
      }



        // console.log("form credentials", email, password)

        // set user in localStorage
        // localStorage.setItem('user', email)

      // login(email, password)
      //   .then((user = currentUser) => {
      //     // Line for Kaiser Admins
      //     if (user.user.email === "1@1.com") {
      //       // return props.history.push('/permissions')
      //     }
      //     else {
      //
      //     }
      //     // console.log(user)
      //   })
      //   .catch((error) => {
      //     setError('Username or password incorrect.')
      //   })
    }

  // if (localStorage.getItem('user')) {
  //   props.history.push('/permissions')
  //   return (
  //     <h1>You are already logged in. Redirecting to home.</h1>
  //   )
  // }
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
