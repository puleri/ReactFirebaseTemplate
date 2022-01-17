import React, { Component } from 'react';
import DropdownMenu from '../DropdownMenu/DropdownMenu.js'
import DropdownPItem from '../DropdownPItem/DropdownPItem.js';
import { withRouter, Link } from 'react-router-dom';
import "./Header.css";


class Header extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: null
    }

  }
  logOut = event => {
    event.preventDefault()
    this.props.logOut()
    // console.log("logging out")
    this.props.history.push('/')
  }

  render() {
    // ternary for if user is set and returning auth vs unauth header
    // Admin Authenticated
    if (localStorage.getItem('user')==="1") {
      // const loggedIn = localStorage.getItem('user')
      return (
        <>

          <div className="colorheader"><div className="top-accent-blue"></div><div className="top-accent-red"></div><div className="top-accent-purple"></div><div className="top-accent-green"></div><div className="top-accent-yellow"></div></div>

          <div className="Nav-container">


            <div className="calendar">
              <Link style={{ textDecoration: 'none' }} to="/"><i className="fas fa-home"/><div className="icon-text">Home</div></Link>
            </div>
            <div className="calendar">
              <Link style={{ textDecoration: 'none' }} to="/upgradetool"><i className="fas fa-flask"></i><div className="icon-text">Testing</div></Link>
            </div>
            <div className="calendar">
              <Link style={{ textDecoration: 'none' }} to="/admin"><i className="fas fa-adjust"/><div className="icon-text">Administrator</div></Link>
            </div>
            <div className="calendar">
              <Link style={{ textDecoration: 'none' }} to="/Support"><i className="far fa-comment-alt"/><div className="icon-text">Support</div></Link>
            </div>
            <div className="calendar">
              <Link style={{ textDecoration: 'none' }} to="/AccountSettings"><i className="account-icon far fa-user-circle"></i><div className="icon-text">Account</div></Link>
            </div>
            <div className="calendar">
              <button className="logout-header" onClick={this.logOut}><i className="logout-icon fas fa-sign-out-alt" /><br/><div className="icon-text">Logout</div></button>
            </div>

          </div>

          <div id="Navbar-bottomline"></div>
        </>

      )
    }
    // Authenticated
    if (localStorage.getItem('user')) {
      // const loggedIn = localStorage.getItem('user')
      return (
        <>
        <div className="colorheader"><div className="top-accent-blue"></div><div className="top-accent-red"></div><div className="top-accent-purple"></div><div className="top-accent-green"></div><div className="top-accent-yellow"></div></div>
        <div className="Nav-container">
          <div className="brand">
          </div>
          <div className="calendar">
            <Link style={{ textDecoration: 'none' }} to="/"><i className="fas fa-home"/><div className="icon-text">Home</div></Link>
          </div>
          <div className="calendar">
            <Link style={{ textDecoration: 'none' }} to="/Support"><i className="far fa-comment-alt"/><div className="icon-text">Support</div></Link>
          </div>
          <div className="calendar">
            <Link style={{ textDecoration: 'none' }} to="/AccountSettings"><i className="account-icon far fa-user-circle"></i><div className="icon-text">Account</div></Link>
          </div>
          <div className="calendar">
            <button className="logout-header" onClick={this.logOut}><i className="logout-icon fas fa-sign-out-alt" /><br/><div className="icon-text">Logout</div></button>
          </div>
        </div>
        <div id="Navbar-bottomline"></div>
        </>

      )
    }
    // Not Authenticated
    return (
      <>
        <div className="Nav-container">
          <div className="brand">
            KaiserTools
          </div>
          <div className="calendar">
            <Link style={{ color: "black", textDecoration: 'none' }} to="/permissions"><i className="fab fa-wpforms"></i><div className="icon-text">Templates</div></Link>
          </div>
          <div className="calendar">
            <Link style={{  color: "black", textDecoration: 'none' }} to="/admin"><i className="far fa-id-badge"></i><div className="icon-text">Administrator</div></Link>
          </div>
          <DropdownPItem className="perm-prof-icon" icon="MP" >
            <DropdownMenu />
          </DropdownPItem>
        </div>
        <div id="Navbar-bottomline"></div>
      </>
    )
  }
}

export default withRouter(Header);
