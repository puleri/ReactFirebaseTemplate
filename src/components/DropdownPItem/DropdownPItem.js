import React, { useState } from 'react';

import './DropdownPItem.css';

export default function DropdownPItem(props) {
  const [open, setOpen] = useState(false);

  return(
    <li className="drop-item">
      <a href="#" className="icon-button" onClick={()=> setOpen(!open)}>
      { props.icon }

      </a>

      {open && props.children}
    </li>
  )
}
