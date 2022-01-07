import React from 'react';
import './Navbar.css';
import logoName from '../../logo.svg';
import hamburger from './hamburger.png';
import firebase, { auth } from '../../firebase';
import { withRouter } from 'react-router-dom';



function Navbar(props) {

  const logOut = (e) => {
    // e.preventDefault()
    console.log("Current user", auth)
    const temp = auth.currentUser.uid;
    const userRef = firebase.firestore().collection('users').doc(temp);

    auth.signOut()
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

  return (
    <div className="home-container">
      <nav className="navbar bg-primary-light justify-content-between">
        <img style={{ filter:'brightness(.8) invert()', height: '50px' }} src={logoName} alt="Blueberry Pediactrics" />
        <button className="btn" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample" >
          <img style={{ height: '30px' }} src={hamburger} alt="menu" />
        </button>
      </nav>
      <div className="collapse" id="collapseExample">
        <div className="nav-drop-custom">
          <a className="nav-item c1" href="/upgradetool">Start</a> <br />
          <a className="nav-item c2" href="/admin">Administrator</a> <br />
          <a className="nav-item c3" href="#">FAQ</a> <br />
          <button className="nav-item c4" onClick={()=> logOut()}>Logout</button> <br />
        </div>
      </div>
    </div>
  )
}

export default withRouter(Navbar);
