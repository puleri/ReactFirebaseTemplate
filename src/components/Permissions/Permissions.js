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

  useEffect(() => {
    console.log(localStorage.user)
    // userDbMatch()
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
    <tr>
      <th>Email</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Status</th>
      <th>Action</th>
    </tr>
    {rosterIndex}
  </table>
)
  const defaultTemplate = (
    <>
      Default Template
    </>
  )
  if (active === 'Admin') {
    activeMenu = rosterFull
  }
  if (active === "Template") {
    activeMenu = defaultTemplate
  }


    return (
      <>
      <div className="permissions-container">
        <div className="permissions-header">
          <h2 className="perm-h1">Role Manager</h2>
          <button onClick={(e) => { setActive('Template') }}><h3>Users</h3></button>
          <button className="Roles-button" onClick={(e) => {userDbMatch()}}><h3>Roles</h3></button>
          <div className="perm-prof-icon"><i className="perm-cog fas fa-cog"></i>
          <DropdownPItem className="perm-prof-icon" icon="MP" >
            <DropdownMenu />
          </DropdownPItem>
          </div>
        </div>
      </div>
      {activeMenu}
      </>
    )
  }
