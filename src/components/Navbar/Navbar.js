import React from 'react';
import './Navbar.css';
import logoName from '../../logo.svg';
import hamburger from './hamburger.png';



export default function Navbar() {

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
          <a className="nav-item c1" href="#">Sign In</a> <br />
          <a className="nav-item c2" href="#">Users</a> <br />
          <a className="nav-item c3" href="#">FAQ</a> <br />
          <a className="nav-item c4" href="#">Support</a> <br />
        </div>
      </div>
    </div>
  )
}
