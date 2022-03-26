import React from 'react';

import css from './HelpModal.module.css';
import icon from './img/appIcon.png';

export default function HelpModal() {

  return (
    <>
      <div className={css.row}>
        <img className={css.icon} src={icon} alt="icon"/>

        <div className={css.glassContainer}>
          <div className={css.close}>
          </div>
          <h4>Your administrator is: Scott Kaiser</h4>
          <p>Contact them at kaiser@kaiser.com for assistance</p>
        </div>
      </div>
    </>
  )
}
