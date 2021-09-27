import React, { useState, useEffect } from 'react';
import DropdownMenu from '../DropdownMenu/DropdownMenu.js'
import DropdownPItem from '../DropdownPItem/DropdownPItem.js';
import { useRouteMatch } from 'react-router-dom';
import firebase, { auth } from '../../firebase';
// import { collection, query, where, getDocs } from "../../firebase/firestore";


import "./Permissions.css";

// const admin = require('firebase-admin');

export default function Permissions(props) {
  const [roster, setRoster] = useState([])
  const [active, setActive] = useState('Template')
  const [existingShingle, setExistingShingle] = useState('')

  useEffect((e) => {
    console.log(localStorage.user)
  }, [])

  const userDbMatch = () => {
    const q = firebase.firestore().collection('users')
    // const authRef = auth.currentUser.email
    // console.log("current user is: ", auth.currentUser.email)
    q.where('email', '==', auth.currentUser.email).onSnapshot((qs) => {
      qs.forEach((doc) => {
          q.get().then(querySnapshot => {

            const d = querySnapshot.docs.map(d =>d.data())
            console.log('users are ', d)
            setRoster(d)
            setActive('Admin')
          })
          console.log('roster is ', roster)
      // console.log('user match in database: ', item.email)

      })
    })
  }
  // tab content
  let activeMenu = <> </>
  const rosterIndex = roster.map((user) =>
  <tr key={user.email}>
    <th>{user.email}</th>
    <th>{user.first}</th>
    <th>{user.last}</th>
    <th>{user.status === 'active' ? 'Active' : user.status === 'pending' ? 'Pending' : 'Disabled'}</th>
    <th>Update</th>
  </tr>
)
  const rosterFull = (
  <table className="admin-table">
    <tbody>
      <tr className="admin-table-label">
        <th>Email</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
      {rosterIndex}
    </tbody>
  </table>
)
  let defaultTemplate

  // tab highlighters
  let templateTab
  let adminTab
  let supportTab

  if (active === 'Admin') {
    activeMenu =
    <div className="admin-container">
    <h3 id="admin-header">Administrator</h3>
    <div className="admin-tip"><p>If this message is visable to you, that means you are a Kaiser Administrator and as such have the ability to create, view, update, and delete users with access to Kaiser Tools</p></div>
    <div className="admin-tip"><p>Each user will have the ability to use the Kaiser Tools after they update their password from the new user default password</p></div>
    {rosterFull}
    </div>

    adminTab = <div className="admin-tab-highlight"></div>
  }
  if (active === "Template") {
    activeMenu =
    <>
    <div className="header-hero">
      <h1 style={{ color: 'white' }}>Roof Measurement</h1>
      <p>All measurements recorded in square feet</p>
    </div>
    <div className="Template-container">
      <form className="roof-measurement-form">
        <div className="form-group">
          <label>Total Roof Area</label>
          <input
          type="number"
          />
        </div>
        <div className="form-group">
          <label>Ridge</label>
          <input
          type="number"
          />
        </div>
        <div className="form-group">
          <label>Hip</label>
          <input
          type="number"
          />
        </div>
        <div className="form-group">
          <label>Valley</label>
          <input
          type="number"
          />
        </div>
        <div className="form-group">
          <label>Rake</label>
          <input
          type="number"
          />
        </div>
        <div className="form-group">
          <label>Eave</label>
          <input
          type="number"
          />
        </div>
        <div className="form-group">
          <label>Counter Flashing</label>
          <input
          type="number"
          />
        </div>
        <div className="form-group">
          <label>Step Flashing</label>
          <input
          type="number"
          />
        </div>
        <div className="form-group">
          <label>Parapets</label>
          <input
          type="number"
          />
        </div>
        <div className="form-group">
          <label>Existing Roof?</label>
          <input
          style={{ width:"40px", height: "40px" }}
          type="checkbox"
          />
        </div>
        <div className="form-group">
          <label>Roof Type</label>
          <select
          name="roof_type"
          id="roof_type"
          size="1">
            <option value="select">Select type</option>
            <option value="gable">Gable</option>
            <option value="hip">Hip</option>
            <option value="mansard">Mansard</option>
            <option value="dutch_hip">Dutch Hip</option>
            <option value="gambrel">Gambrel</option>
            <option value="flat">Flat</option>
            <option value="shed">Shed</option>
          </select>
        </div>
        <div className="form-group">
          <label>Existing Shingle</label>
          <select
          name="existing_shingle"
          id="roof_type"
          size="1"
          onChange={(e) => setExistingShingle(e.target.value)}>
            <option value="select">Select shingle</option>
            <option value="3-tab">3-Tab</option>
            <option value="laminate">Laminate</option>
          </select>
        </div>
      </form>
    </div>
    </>

    templateTab = <div className="temp-tab-highlight"></div>
  }
  if (active === "Support") {
    activeMenu = <h1>Support</h1>
    supportTab = <div className="support-tab-highlight"></div>
  }


    return (
      <>
      <div className="permissions-container">
        <div className="permissions-header">
          <h2 className="perm-h1">KaiserTools</h2>
          <button className="Roles-button" onClick={(e) => { setActive('Template') }}><h3>Template</h3>
            {templateTab}
          </button>
          <button className="Roles-button" onClick={(e) => { userDbMatch() }}><h3>Roles</h3>
            {adminTab}
          </button>
          <button className="Roles-button" onClick={(e) => { setActive('Support') }}><h3>Support</h3>
            {supportTab}
          </button>
          <div className="perm-prof-icon"><i className="perm-cog fas fa-cog"></i>
          <DropdownPItem className="perm-prof-icon" icon="MP" >
            <DropdownMenu setCurrentUser={props}/>
          </DropdownPItem>
          </div>
        </div>
      </div>
      {activeMenu}
      </>
    )
  }
