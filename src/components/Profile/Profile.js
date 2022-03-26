// React and useState import
// eslint-disable-next-line
import React, { useState } from 'react'
import MonthSelect from './MonthSelect.js'
import DaySelect from './DaySelect.js'
import YearSelect from './YearSelect.js'
import Navbar from '../Navbar/Navbar.js';
import ChangePW from './ChangePW.js';
import Sidebar from './Sidebar.js';
import HelpModal from './HelpModal.js';
import Footer from '../Footer/Footer.js';

import firebase from '../../firebase'


// Organized most CSS relevant for form page into one file
import './Form.css'

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react'

// Library for drag and drop file uploading
import Dropzone from 'react-dropzone'

// images exported from figma
import check from '../img/check.png'

// Form component (functional)
function Form () {
  // State management for form
  const [formValues, setFormValues] = useState(
    {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      birthMonth: '',
      birthDay: '',
      birthYear: '',
      bio: ''
    }
  )
  const [profilePic, setProfilePic] = useState([{ preview: '' }])
  // state hook used for show/hide toaster notification
  const [toasterShow, setToasterShow] = useState('no-toast')
  // Functionw that validates unique inputs
  // and updates the UI to let the prompt the user when
  // inputs are invalid
  const firstNameValidation = (e) => {
    if (!e.target.value) {
      setFirstValid({ isValid: false, classes: 'settings-input not-valid' })
    } else {
      setFirstValid({ isValid: true, classes: 'settings-input' })
    }
  }
  const lastNameValidation = (e) => {
    if (!e.target.value) {
      setLastValid({ isValid: false, classes: 'settings-input not-valid' })
    } else {
      setLastValid({ isValid: true, classes: 'settings-input' })
    }
  }
  const emailValidation = (e) => {
    const validateEmail = (email) => {
      return String(email)
        .toLowerCase()
        .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    }

    if (!validateEmail(e.target.value)) {
      setEmailValid({ isValid: false, classes: 'settings-input not-valid' })
    } else {
      setEmailValid({ isValid: true, classes: 'settings-input' })
    }
  }
  const phoneValidation = (e) => {
    const validatePhone = (phone) => {
      // eslint-disable-next-line
      const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
      return re.test(phone)
    }
    if (!validatePhone(e.target.value)) {
      setPhoneValid({ isValid: false, classes: 'settings-input not-valid' })
    } else {
      setPhoneValid({ isValid: true, classes: 'settings-input' })
    }
  }
  const bioValidation = (e) => {
    if (!e.target.value) {
      setBioValid({ isValid: false, classes: 'settings-input bio not-valid' })
    } else {
      setBioValid({ isValid: true, classes: 'settings-input bio' })
    }
  }
  // State hooks are all used to check validation and referenced in JSX to update UI accordingly
  const [firstValid, setFirstValid] = useState({ isValid: true, classes: 'settings-input' })
  const [lastValid, setLastValid] = useState({ isValid: true, classes: 'settings-input' })
  const [emailValid, setEmailValid] = useState({ isValid: true, classes: 'settings-input' })
  const [phoneValid, setPhoneValid] = useState({ isValid: true, classes: 'settings-input' })
  const [bioValid, setBioValid] = useState({ isValid: true, classes: 'settings-input bio' })
  // Function that toggles between "Upload" and "Remove"
  const handlePic = (e) => profilePic && setProfilePic([{ preview: '' }])
  // Function that handles the submission of the form and calls the toaster function
  // if form is completed and validated
  const handleSubmit = (form) => {
    if (firstValid.isValid && lastValid.isValid && emailValid.isValid && phoneValid.isValid && bioValid.isValid) {
      setFormValues({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        birthMonth: '',
        birthDay: '',
        birthYear: '',
        bio: ''
      })
      // trantisions the toaster animation in
      setToasterShow('toast')
      // waits 3 seconts then transitions the toaster out
      setTimeout(function () {
        setToasterShow('no-toast')
      }, 3000)
    }
  }
  // Hook to handle custom dropdowns
  const [clearHandler, useClearHandler] = useState(true)

  // loops creating date options used in the DOB question

  // JSX which is used by the DOM and virtual DOM to create the GUI
  return (
    <> {
      // icons from https://icons8.com
    }
    <Navbar />
    <Sidebar />
    <div className="settings-form-with-img">
      <div className={toasterShow}><img alt="check" id="check" src={check} />Changes have been saved successfully</div>
      <div>
      <div className="settings-form-container">
      <h2 className="settings-header">Profile info</h2>
      <form className="form-wrapper">
        <label className="profile-label">first name*</label>
        <input
        className={firstValid.classes}
        onChange={ (e) => setFormValues({ ...formValues, firstName: e.target.value })}
        onBlur={(e) => firstNameValidation(e) }
        name='firstName'
        value={formValues.firstName}
        type="text" />
        <em
        css={css`text-align:left;
          font-family: "Poppins", sans serif;
          width: 400px;
          height: 7px;
          color: red;
          font-size: 8px;`}>
          { firstValid.isValid ? '' : 'This field is required*'}
        </em>

        <label className="profile-label">last name*</label>
        <input
        className={lastValid.classes}
        onChange={ (e) => setFormValues({ ...formValues, lastName: e.target.value })}
        onBlur={(e) => lastNameValidation(e) }
        name='lastname'
        value={formValues.lastName}
        type="text" />
        <em
        css={css`text-align:left;
          font-family: "Poppins", sans serif;
          width: 400px;
          height: 7px;
          color: red;
          font-size: 8px;`}>
          { lastValid.isValid ? '' : 'This field is required*'}
        </em>

        <label className="profile-label">email*</label>
        <input
        className={emailValid.classes}
        onChange={ (e) => setFormValues({ ...formValues, email: e.target.value })}
        onBlur={(e) => emailValidation(e) }
        name='firstName'
        value={formValues.email}
        type="text" />
        <em
        css={css`text-align:left;
          font-family: "Poppins", sans serif;
          width: 400px;
          height: 7px;
          color: red;
          font-size: 8px;`}>
          { emailValid.isValid ? '' : 'This field is required*'}
        </em>

        <label className="profile-label">phone*</label>
        <input
        className={phoneValid.classes}
        onChange={ (e) => setFormValues({ ...formValues, phone: e.target.value })}
        onBlur={(e) => phoneValidation(e) }
        name='firstName'
        value={formValues.phone}
        type="text" />
        <em
        css={css`text-align:left;
          font-family: "Poppins", sans serif;
          width: 400px;
          height: 7px;
          color: red;
          font-size: 8px;`}>
          { phoneValid.isValid ? '' : 'This field is required*'}
        </em>

        {
          // Start of Custom Dropdown
        }
        <br/><br/><br/>
        <label className="profile-label">select your date of birth</label>
        <div id="dropdown-date" style={{ display: 'flex' }}>
        <MonthSelect clearHandler={clearHandler}/>
        <DaySelect clearHandler={clearHandler}/>
        <YearSelect clearHandler={clearHandler}/>
        </div>

        {
          // End of Custom Dropdown
        }

        <label className="profile-label">bio</label>
        <textarea
        className={bioValid.classes}
        onChange={ (e) => setFormValues({ ...formValues, bio: e.target.value })}
        name='firstName'
        value={formValues.bio}
        rows="20" cols="50" />
        <em
        css={css`text-align:left;
          font-family: "Poppins", sans serif;
          width: 400px;
          height: 7px;
          color: red;
          font-size: 8px;`}>
          { bioValid.isValid ? '' : 'This field is required*'}
        </em>

        <hr className="light-line"/>
      </form>
        <div className="settings-submit-wrapper">
          <button disabled={(toasterShow === 'toast')} onClick={ () => handleSubmit() } className="save-btn">Save Changes</button>
          <button className="discard-btn">Discard</button>
        </div>
        <a id="change-pw"></a>
        <hr className="light-line"/>
      </div>

      <HelpModal />

      <ChangePW firebase={firebase}/>
      </div>

    </div>
    <Footer />
    </>
  )
}

export default Form
