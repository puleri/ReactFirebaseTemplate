import React, { useState, useEffect } from 'react';
// import Header from '../../components/Header/Header.js'
import Navbar from '../Navbar/Navbar.js';

import Footer from '../../components/Footer/Footer.js'

import firebase, { getAuth } from '../../firebase';

import 'firebase/firestore';


import './Admin.css';

export default function Admin() {

  // Initial State

  const [roster, setRoster] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const [first, setFirst] = useState('')
  const [last, setLast] = useState('')
  const [email, setEmail] = useState('')

  const [error, setError] = useState(
    // <div className="admin-tip2">
    //   <h5>Please fill out all fields before inviting user</h5>
    // </div>
  )
  const [currentUser, setCurrentUser] = useState('')

  const getCurrentUser = () => {
    const temp = getAuth.currentUser.uid;
    const userRef = firebase.firestore().collection('admin').doc(temp);
    var docRef = firebase.firestore().collection("admin").doc(temp);
    docRef.get().then((doc) => {
      if (doc.exists) {
          // console.log("Document data:", doc.data());
          setCurrentUser(doc.data())
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
    })
  }

  useEffect(() => {
    userDbMatch()
    getCurrentUser()
  }, [])

  // CRD for Users
  // CREATE user
  const signUpUser = (first, last, email) => {
    // check if any fields are empty: if so return with Error, if not, reset error state
    setError(
      <div className="admin-tip2">
        <h5>Please fill out all fields before inviting user</h5>
      </div>
    )
    if (first === '' || last === '' || email === '') {
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
    getAuth.createUserWithEmailAndPassword(email, password)
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
    setIsLoading(true)
    const q = firebase.firestore().collection('users')
    q.get().then(querySnapshot => {
      const d = querySnapshot.docs.map(d => d.data())
      // console.log('users BIG ', d)
      setRoster(d)
    })
    setIsLoading(false)
  }

  const markets = (arr) => arr.forEach(el => {
    return el
  });

  const roleStyles = (role) => {
    if (role == "Super Admin") {
      return "super-admin"
    }
  }

  const rosterIndex =
    roster.map((user) =>
      <tr id="t-body" key={user.email}>
        <th id="th-body">{user.first} {user.last}<br/><span id="user-email">{user.email}</span></th>
        <th id="th-body-role"><span id={roleStyles(user.role)}>{user.role}</span></th>
        <th id="th-body-markets">{user.markets.join(', ')}</th>
        <th id="th-body-status">{user.status === 'active' ? <em id="active">Active</em> : user.status === 'pending' ? <em id="pending">Pending</em> : 'Inactive'}</th>
        <th id="th-body-actions"><span id="reset-pw"><i class="table-icon fa-solid fa-arrow-rotate-right"></i> Reset Password</span> <i onClick={() => deleteUser(user)} className="table-icon fa-solid fa-trash"></i> Delete</th>
      </tr>
    )
  const rosterFull = (
    <table className="admin-table">
      <tbody>
        <tr className="admin-table-label">
          <th id="table-label">name</th>
          <th id="table-label">role</th>
          <th id="table-label">markets</th>
          <th id="table-label">status</th>
          <th id="table-label">actions</th>
        </tr>
        {isLoading ? (
          <tr><th>Loading...</th></tr>
        ) : rosterIndex}
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

  const currentDate = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
  const todayDate = currentDate.toLocaleDateString('en-us', options);
  
 

  return (
    <>
      <div className="admin-wrapper">
        <Navbar />
        <div className="admin-container">
          <div className='admin-center'>
          <h3 id="admin-header">Admin Dashboard</h3>
          <br />
          <div className="admin-tip">
            <div className="admin-tri-panel">
              <h4 className="tri-panel-header">
                🏘 &nbsp; Hello {currentUser.first},
                <div className="super-admin-tag">Super Admin</div>
              </h4>
              <div className='admin-subheader-1'>
              <p className='tri-panel-light'>Today is {todayDate}</p>
              <ul className='tri-panel-ul'>
                <li>Atlanta</li>
                <li>Charlotte</li>
                <li>Cincinnatti</li>
              </ul>
              </div>
            </div>
            <div className="admin-tri-panel">
              <h4 className="tri-panel-header">
                🗺 &nbsp; Markets:
              </h4>
              <p className="tri-panel-sub">Create, edit, and update market-specific upgrade programs</p>
            </div>
            <div className="admin-tri-panel">
              <h4 className="tri-panel-header">
                💡 &nbsp; Tip:
              </h4>
              <p className="tri-panel-sub">New users have a default password.
That password is <span className="code">password</span></p>
            </div>
          </div>
          <br/><br/>

          <div className='admin-table-header'>
            <h3 className='users-table-heder'>All Users <span className='total-users'>34</span></h3>
            <button className='add-new-user'>+ Add New User</button>
          </div>
          {error}

          {/* Create NEW user form
          <div className="admin-form">
            <div className="admin-input-group">
              <label className="admin-label" >first name</label>
              <input type="text"
                className="admin-input"
                placeholder="Winston"
                value={first}
                onChange={(e) => setFirst(e.target.value)} />
            </div>
            <div className="admin-input-group">
              <label className="admin-label" >last name</label>
              <input type="text"
                className="admin-input"
                placeholder="Schmidt"
                value={last}
                onChange={(e) => setLast(e.target.value)} />
            </div>
            <div className="admin-input-group">
              <label className="admin-label" >email</label>
              <input type="email"
                className="admin-input"
                placeholder="wschmidt@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
            </div>
            <button
              className="admin-submit"
              onClick={() => signUpUser(first, last, email)}>
              Invite
            </button>

          </div> */}
          <div className="user-table">
            {rosterFull}
          </div>
        </div>
        </div>
        {/* <Footer className="footer-admin" /> */}
        {
          // <div style={{position: 'absolute', bottom: '-100px', background: '#333333', width: '100%', height: '100px'}}></div>
        }
      </div>
    </>
  )
}
