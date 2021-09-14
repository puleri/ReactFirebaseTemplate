import React, { useState } from 'react'
import './DropdownMenu.css';

import { CSSTransition } from 'react-transition-group';


export default function DropdownMenu() {

  const [activeMenu, setActiveMenu] = useState('main');
  // function MenuItem(props) {
  //   <a href="#" className="menu-item">
  //     <span className="icon-button">{props.leftIcon}</span>
  //     {props.children}
  //     <span className="icon-right">{props.rightIcon}</span>
  //   </a>
  // }
  return (
    <div className="DropdownMenu">
        <h4>
        hello
        </h4>
        <h4>
        hello world
        </h4>
        <h4>
        logout
        </h4>
    </div>
  )
}
