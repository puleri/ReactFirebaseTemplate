import React from 'react'
import user from './img/User.png'
import password from './img/Lock.png'
import feedback from './img/Question.png'
import help from './img/Message.png'

import css from './Sidebar.module.css';




export default function Sidebar() {

  return (
    <>
      <div className={css.container}>
        <a  href="#top" className={css.sidebarItem}>
          <img className={css.icon} src={user} alt="User"/>
          <p className={css.iconText}>Profile</p>
        </a>
        <a href="#change-pw" className={css.sidebarItem}>
          <img className={css.icon} src={password} alt="Password"/>
          <p className={css.iconText}>Change password</p>
        </a>
        <hr className={css.lightLine}/>
        <a href="/Support" className={css.sidebarItem}>
          <img className={css.icon} src={help} alt="Help"/>
          <p className={css.iconText}>Send feedback</p>
        </a>
        <div className={css.sidebarItem}>
          <img className={css.icon} src={feedback} alt="Feedback"/>
          <p className={css.iconText}>Help</p>
        </div>
      </div>
    </>
  )
}
