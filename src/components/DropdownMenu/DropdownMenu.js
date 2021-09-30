import React, { useState } from 'react'
import './DropdownMenu.css';
import { withRouter } from 'react-router-dom';
import firebase, { auth } from '../../firebase';


import { CSSTransition } from 'react-transition-group';


function DropdownMenu(props) {

  const handleLogOut = (e) => {
    // e.preventDefault()
    console.log("Current user", auth)
    const temp = auth.currentUser.uid;

    auth.signOut()
      .then(() => {
        firebase.firestore().collection('users').doc(temp).set({
          status: 'inactive',
        }, { merge: true })
        localStorage.removeItem('user')
        props.history.push('/login');
        // console.log('props are ', props)
        console.log('successful logout')
      })
      .catch(err => {
        console.log(err)
        console.log("Error Signing Out");
      })
  }
  // const [activeMenu, setActiveMenu] = useState('main');
  // function MenuItem(props) {
  //   <a href="#" className="menu-item">
  //     <span className="icon-button">{props.leftIcon}</span>
  //     {props.children}
  //     <span className="icon-right">{props.rightIcon}</span>
  //   </a>
  // }
  return (
    <div className="DropdownMenu">
        <button className="dd-button">
        Profile
        </button>
        <button className="dd-button">
        Settings
        </button>
        <hr noshade id="dd-break1" />
        <button className="dd-button">
        Admin Panel
        </button>
        <hr noshade id="dd-break2" />
        <button onClick={(e) => handleLogOut()} className="dd-button">
        Logout
        </button>
    </div>
  )
}

export default withRouter(DropdownMenu);
