import React from 'react'
import './Unauthorized.css'
import logo from "../../logo.svg";


export default function Unauthorized(props) {

  const home = (e) => {
    props.history.push('login')
  }
  return (
    <div className="container">
      <img alt="kaiser logo" src={logo} className="unauth-logo"/>
      <div className="left">
      </div>
      <div className="left2">
      </div>
      <div id="left-copy">
      <h1 id="header">Nothing to see here!</h1>
      <p>Looks like you do not have access to this page.</p>
      <br />
      <button className="unauth-home" onClick={() => home()}>Home</button>
      </div>

      <div className="right">

      </div>
    </div>
  )
}