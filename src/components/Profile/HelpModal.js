import React from 'react';

import css from './HelpModal.module.css';
import icon from './img/appIcon.png';

export default function HelpModal(props) {

  return (
    <div className={props.show}>
        <div className={css.row}>
          <img className={css.icon} src={icon} alt="icon"/>

          <div className={css.glassContainer}>
            <div onClick={() => props.setHelpShow('no-help')} className={css.close}>
            <span>x</span>
            </div>
            <h4>Your administrator is: Scott Kaiser</h4>
            <p>Contact them at kaiser@kaiser.com for assistance</p>
          </div>
          <button onClick={() => props.setHelpShow('no-help')} className={css.cancel}>Close</button>
        </div>
    </div>
  )
}
