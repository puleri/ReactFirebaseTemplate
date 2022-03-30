import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import firebase, { getAuth } from '../../firebase';

import css from './Forgot.module.css'

import logo from "../../logo.svg";


export default function ForgotPassword() {

  const [email, setEmail] = useState('')
  const [emailCnf, setEmailCnf] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = () => {

  }

  return (
    <>
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
