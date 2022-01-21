import React, {useEffect, useState} from 'react';
import './Navbar.css';
import logoName from '../../logo.svg';
import hamburger from './hamburger.png';
import firebase, { getAuth } from '../../firebase';
import { withRouter } from 'react-router-dom';



function Navbar(props) {

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

  const user = firebase.auth().currentUser;
  const adminRef = firebase.firestore().collection('admin').doc(user.uid);

  const [isAdmin, setIsAdmin] = useState(false);

  adminRef.get().then((doc) => {
    if (doc.exists) {
      setIsAdmin(true)
      console.log("Doc data ", doc.data())
    }
    else {
      setIsAdmin(false)
      console.log("No such document!")
    }
  }).catch((err) => console.log("Error getting doc: ", err))


  if (isAdmin) {
    return (
      <div className="home-container">
        <nav className="navbar bg-primary-light justify-content-between">
          <img style={{ filter:'brightness(1)', height: '50px' }} src={logoName} alt="Blueberry Pediactrics" />
          <button className="btn" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample" >
            <img style={{ height: '30px' }} src={hamburger} alt="menu" />
          </button>
        </nav>
        <div className="collapse" id="collapseExample">
          <div className="nav-drop-custom">
            <a className="nav-item c1" href="/upgradetool">Start</a> <br />
            <a className="nav-item c2" href="/admin">Administrator</a> <br />
            <a className="nav-item c3" href="#">FAQ</a> <br />
            <button className="logout nav-item c4" onClick={()=> logOut()}>Logout</button> <br />
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="home-container">
        <nav className="navbar bg-primary-light justify-content-between">
          <img style={{ filter:'brightness(1)', height: '50px' }} src={logoName} alt="Blueberry Pediactrics" />
          <button className="btn" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample" >
            <img style={{ height: '30px' }} src={hamburger} alt="menu" />
          </button>
        </nav>
        <div className="collapse" id="collapseExample">
          <div className="nav-drop-custom">
            <a className="nav-item c1" href="/upgradetool">Start</a> <br />
            <a className="nav-item c3" href="#">FAQ</a> <br />
            <button className="logout nav-item c4" onClick={()=> logOut()}>Logout</button> <br />
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Navbar);
