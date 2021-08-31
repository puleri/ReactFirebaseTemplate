import React, { useState, useEffect } from 'react';
import DropdownP from '../DropdownP/DropdownP.js'
import DropdownPItem from '../DropdownPItem/DropdownPItem.js';
import { useRouteMatch } from 'react-router-dom';
import firebase, { auth } from '../../firebase';
// import { collection, query, where, getDocs } from "../../firebase/firestore";


import "./Permissions.css";

export default function Permissions(props) {

  useEffect(() => {
    console.log(localStorage.user)
  }, [])

  const userDbMatch = () => {
    const q = firebase.firestore().collection('users')
    const authRef = auth.currentUser.email
    // console.log("current user is: ", auth.currentUser.email)
    q.where('email', '==', auth.currentUser.email).onSnapshot((qs) => {
      qs.forEach((doc) => {
        const dbRef = doc.data().email
        if (dbRef === authRef) {
          console.log('yes')
        }
      // console.log('user match in database: ', item.email)

      })
    })
  }


    return (
      <>
      <div className="permissions-container">
        <div className="permissions-header">
          <h2 className="perm-h1">Role Manager</h2>
          <h3>Users</h3>
          <button className="Roles-button" onClick={(e) => {userDbMatch()}}><h3>Roles</h3></button>
          <div className="perm-prof-icon"><i className="perm-cog fas fa-cog"></i>
          <DropdownPItem className="perm-prof-icon" icon="MP" >
            <p>hello world</p>
          </DropdownPItem>
          </div>
        </div>
      </div>
      </>
    )
  }
