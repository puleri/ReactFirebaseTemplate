// React and useState import
// eslint-disable-next-line
import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar.js';

import { getAuth } from '../../firebase';


import check from '../img/check.png'

// Organized most CSS relevant for form page into one file
import './Form.css'
//
// /** @jsxRuntime classic */
// /** @jsx jsx */
import { css, jsx } from '@emotion/react'


// Form component (functional)
function ChangePW (props) {

  // firebase passed as prop and used here to get the current user
  const user = props.firebase.auth().currentUser;

  // State management for password Change
  const [passForm, setPassForm] = useState({
    oldPW: '',
    newPW: '',
    cnfNewPW: ''
  })

  // state hook used for show/hide toaster notification
  const [toasterShow, setToasterShow] = useState('no-toast')

  // Functionw that validates unique inputs
  // and updates the UI to let the prompt the user when
  // inputs are invalid
  const newPassValidationCheck = (e) => {
    const validatePW = (pw) => {
      // eslint-disable-next-line
      const spec = /(?=.*[!@#$%^&*])/;
      const num = /(?=.*[0-9])/;
      const leng = /(?=.{5,11})/;
      return spec.test(pw) && num.test(pw) && leng.test(pw)
    }
    if (!validatePW(e.target.value)) {
      setNewPassValid({ isValid: false, classes: 'settings-input not-valid' })
    } else {
      setNewPassValid({ isValid: true, classes: 'settings-input' })
    }
  }
  const oldPassValidation = (e) => {
    if (!e.target.value) {
      setOldPassValid({ isValid: false, classes: 'settings-input not-valid' })
    } else {
      setOldPassValid({ isValid: true, classes: 'settings-input' })
    }
  }
  const cnfPassValidation = (e) => {
    if (!e.target.value || passForm.newPW !== e.target.value) {
      setCnfPassValid({ isValid: false, classes: 'settings-input not-valid' })
    } else {
      setCnfPassValid({ isValid: true, classes: 'settings-input' })
    }
  }
  // State hooks are all used to check validation and referenced in JSX to update UI accordingly
  const [newPassValid, setNewPassValid] = useState({ isValid: true, classes: 'settings-input' })
  const [oldPassValid, setOldPassValid] = useState({ isValid: true, classes: 'settings-input' })
  const [cnfPassValid, setCnfPassValid] = useState({ isValid: true, classes: 'settings-input' })

  // Function that handles the submission of the form and calls the toaster function
  // if form is completed and validated
  const handleSubmit = (form) => {

    // reauthenticate user if they have been logged in a long time
    getAuth.signInWithEmailAndPassword(user.email, passForm.oldPW)
      .then((creds) => {
        user.reauthenticateWithCredential(creds)
          .catch(err=>console.err)
      })
      .catch(err=>console.err)

    // if new password meets strength requirements update password
    // then clear form, and notify user of success
    if (newPassValid.isValid) {
      user.updatePassword(passForm.newPW)
        .then(() => {
          setPassForm({
            oldPW: '',
            newPW: '',
            cnfNewPW: ''
          })
          // trantisions the toaster animation in
          setToasterShow('toast')
          // waits 3 seconts then transitions the toaster out
          setTimeout(function () {
            setToasterShow('no-toast')
          }, 3000)
        })
        .catch(console.err)
    }
  }

  // JSX which is used by the DOM and virtual DOM to create the GUI
  return (
    <>
    <div className="settings-form-PW">
      <div className={toasterShow}><img alt="check" id="check" src={check} />Password has been updated successfully</div>
      <div>
      <div className="settings-form-container">
      <h2 className="settings-header">Change password</h2>
      <form className="form-wrapper">
        <label className="profile-label">old password*</label>
        <input
        className={oldPassValid.classes}
        onChange={ (e) => setPassForm({ ...passForm, oldPW: e.target.value })}
        onBlur={(e) => oldPassValidation(e) }
        name='old password'
        value={passForm.oldPW}
        type="password" />
        <em
        css={css`text-align:left;
          font-family: "Poppins", sans serif;
          width: 400px;
          height: 7px;
          color: red;
          font-size: 8px;`}>
          { oldPassValid.isValid ? '' : 'This field is required*'}
        </em>

        <label className="profile-label">new password*</label>
        <input
        className={newPassValid.classes}
        onChange={ (e) => setPassForm({ ...passForm, newPW: e.target.value })}
        onBlur={(e) => newPassValidationCheck(e) }
        name='new password'
        value={passForm.newPW}
        type="password" />
        <em
        css={css`text-align:left;
          font-family: "Poppins", sans serif;
          width: 400px;
          height: 7px;
          color: red;
          font-size: 8px;`}>
          { newPassValid.isValid ? '' : 'Passwords must be 5-11 chacters, contain a number, a special character*'}
        </em>

        <label className="profile-label">confirm new password*</label>
        <input
        className={cnfPassValid.classes}
        onChange={ (e) => setPassForm({ ...passForm, cnfNewPW: e.target.value })}
        onBlur={(e) => cnfPassValidation(e) }
        name='confirm new password'
        value={passForm.cnfNewPW}
        type="password" />
        <em
        css={css`text-align:left;
          font-family: "Poppins", sans serif;
          width: 400px;
          height: 7px;
          color: red;
          font-size: 8px;`}>
          { cnfPassValid.isValid ? '' : 'Needs to match new password*'}
        </em>

        <hr className="light-line"/>
      </form>
        <div className="settings-submit-wrapper">
          <button disabled={(toasterShow === 'toast')} onClick={ () => handleSubmit() } className="pw-btn">Change Password</button>
        </div>
      </div>
      </div>

    </div>
    </>
  )
}

export default ChangePW
