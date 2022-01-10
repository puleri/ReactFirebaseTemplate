import React, { useState } from 'react'
import './DropdownMenu.css';
import { withRouter } from 'react-router-dom';
import firebase, { getAuth } from '../../firebase';


// import { CSSTransition } from 'react-transition-group';


function DropdownMenu(props) {

  const logOut = (e) => {
    // e.preventDefault()
    console.log("Current user", getAuth)
    const temp = getAuth.currentUser.uid;
    const userRef = firebase.firestore().collection('users').doc(temp);

    getAuth.signOut()
      .then(() => {
        if (userRef.exists) {
        firebase.firestore().collection('users').doc(temp).set({
          status: 'inactive',
        }, { merge: true })
        localStorage.removeItem('user')

      }

      })
      .then(() => { props.history.push('/login');
      // console.log('props are ', props)
      console.log('successful logout')})
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
        <hr id="dd-break1" />
        <button className="dd-button">
        Admin Panel
        </button>
        <hr id="dd-break2" />
        <button onClick={(e) => logOut()} className="dd-button">
        Logout
        </button>
    </div>
  )
}

export default withRouter(DropdownMenu);
