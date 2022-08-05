import React, { useState } from 'react';

import css from './CreateModal.module.css';

import firebase, { getAuth } from '../../firebase';

import 'firebase/firestore';
import MarketDropdown from './MarketDropdown';


export default function CreateModal(props) {

    const [first, setFirst] = useState('')
    const [last, setLast] = useState('')
    const [email, setEmail] = useState('')

    const [error, setError] = useState(
        // <div className="admin-tip2">
        //   <h5>Please fill out all fields before inviting user</h5>
        // </div>
      )

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
  

  return (
    <div className={props.show}>
        <div className={css.row}>

          <div className={css.glassContainer}>
            <div onClick={() => props.setCreateShow('no-help')} className={css.close}>
            <span>x</span>
            </div>

            <div className={css.contentWrapper}>
                <div className={css.contentContainer}>
                    <div className="admin-form">
                        <div className="admin-input-group">
                        <h2 className={css.header}>Set New User Info</h2>
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
                        <MarketDropdown/>
                        <button
                        className="admin-submit"
                        onClick={() => signUpUser(first, last, email)}>
                        Invite
                        </button>

                    </div>
          </div>
        </div>

          </div>
          <button onClick={() => props.setCreateShow('no-help')} className={css.cancel}>Close</button>
        </div>
    </div>
  )
}
