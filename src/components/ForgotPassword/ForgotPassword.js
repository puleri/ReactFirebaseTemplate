import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import firebase, { getAuth } from '../../firebase';

import css from './Forgot.module.css'

import logo from "../../logo.svg";
import check from '../img/check.png'



export default function ForgotPassword() {

  const [email, setEmail] = useState('')
  const [emailCnf, setEmailCnf] = useState('')
  const [error, setError] = useState('')

  const [toasterShow, setToasterShow] = useState('no-toast')


  const handleSubmit = () => {
    firebase.auth().sendPasswordResetEmail(email)
      .then(() => {
        console.log("email sent!")
        // trantisions the toaster animation in
        setToasterShow('toast')
        // waits 3 seconts then transitions the toaster out
        setTimeout(function () {
          setToasterShow('no-toast')
        }, 3000)
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage)
      })
  }

  return (
    <>
    <div className={toasterShow}><img alt="check" id="check" src={check} />Reset instructions have been sent successfully</div>

    <div className={css.loginPage}>
      <div className={css.loginWelcome}>
        <h1 className={css.loginH1}>Forgot <br/> Password?</h1>
        <h2 className={css.loginH2}>Enter the email you used when you joined and we’ll send you instructions to reset your password</h2>
        <h2 className={css.loginH22}>For security reasons, we do NOT store your password, so rest assured we will never send your password via email.</h2>

      </div>
      <div className={css.circle1}>
      </div>
      <div className={css.circle2}>
      </div>
      <div className={css.loginForm}>
      <img alt="Kaiser White Logo -- The word 'Kaiser' with a roof on top" className={css.logo} src={logo} />
      <p className={css.errorMessage}>{error}</p>
        <input onChange = {(e) => setEmail(e.target.value)} type="email" className={css.loginEmail} placeholder="Email:"/>
        <button className={css.pulse} onClick={handleSubmit}>Send reset instructions</button>
      </div>

    </div>    </>
  )
}
