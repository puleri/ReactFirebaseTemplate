import React, { useState, useEffect } from 'react';
import firebase, { auth } from '../../firebase';

import './Admin.css';

export default function Admin(){

  // Initial State

  const [roster, setRoster] = useState([])

  const [first, setFirst] = useState('')
  const [last, setLast] = useState('')
  const [email, setEmail] = useState('')

  const [error, setError] = useState(
    <div className="admin-tip2">
    <h5>Please fill out all fields before inviting user</h5>
    </div>
  )

  // CRD for Users
// CREATE user
  const signUpUser = (first, last, email) => {
    // check if any fields are empty: if so return with Error, if not, reset error state
    setError(
      <div className="admin-tip2">
      <h5>Please fill out all fields before inviting user</h5>
      </div>
    )
    if(first === '' || last === '' || email === '') {
      return setError(
        <div className="admin-tip2-active">
        <h5><em>Please fill out all fields before inviting user</em></h5>
        </div>

      )
    }
    // console.log('this state is', first, last, email);
    const password = 'password'
    // console.log('current user is', auth.currentUser)
    // admin
    //   .auth()
    //   .getUser(auth.currentUser.uid)
    //   .then((userRecord)=>{
    //   console.log('admin loggin current is ', userRecord)
    // })
    //   .catch(err=>console.log('error fetching admin data', err))
    auth.createUserWithEmailAndPassword(email, password)
      .then(creds => {
        firebase.firestore().collection('users').doc(creds.user.uid).set({
          id: creds.user.uid,
          status: 'pending',
          email: email,
          first: first,
          last: last
        })
      })
    .then(() => {
      // reset form
      setFirst('')
      setLast('')
      setEmail('')
    })
    .catch(err => console.log("There was a problem signing up", err))
  }

// READ index of users
  const userDbMatch = () => {
    const q = firebase.firestore().collection('users')
    q.get().then(querySnapshot => {
      const d = querySnapshot.docs.map(d =>d.data())
      console.log('users BIG ', d)
      setRoster(d)
    })
  }


  const rosterIndex = roster.map((user) =>
    <tr id="t-body"key={user.email}>
      <th id="th-body">{user.email}</th>
      <th id="th-body">{user.first}</th>
      <th id="th-body">{user.last}</th>
      <th id="th-body">{user.status === 'active' ? 'Active' : user.status === 'pending' ? 'Pending' : 'Inactive'}</th>
      <th id="th-body"><i onClick={() => deleteUser(user)} className="delete far fa-minus-square"></i></th>
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
          <th>Remove</th>
        </tr>
        {rosterIndex}
      </tbody>
    </table>
  )

// DELETE user
const deleteUser = (user) => {
    // console.log(user)
    // delete from user collection
    firebase.firestore().collection('users').doc(user.id).delete()
    // Success message
    // .then()
    // error message
    // .catch()

    // add to graveyard
    firebase.firestore().collection('graveyard').doc(user.id).set({
      email: user.email,
      id: user.id,
    })
    // Success message
    // .then()
    // error message
    // .catch()
  }


  return (
    <div className="admin-container">
    <h3 id="admin-header">Administrator</h3>
    <div className="admin-tip"><p>If this message is visable to you, that means you are a Kaiser Administrator and as such have the ability to create, view, update, and delete users with access to Kaiser Tools</p></div>
    <div className="admin-tip"><p>Each user will have the ability to use the Kaiser Tools after they update their password from the new user default password</p></div>
      {error}
    <div className="admin-form">
      <div className="form-group">
        <label>First Name</label>
        <input type="text"
        placeholder="Clover"
        value={first}
        onChange={(e) => setFirst(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Last Name</label>
        <input type="text"
        placeholder="Farshchi"
        value={last}
        onChange={(e) => setLast(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Last Name</label>
        <input type="email"
        placeholder="cfarshchi@gmail.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)} />
        <button onClick={() => userDbMatch()}/>
      </div>
      <button
      className="admin-submit"
      onClick={()=> signUpUser(first, last, email)}>
      Invite
      </button>
    </div>
    {rosterFull}
    </div>
  )
}
