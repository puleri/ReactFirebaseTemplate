import React, { useState } from 'react';

import css from './MarketSettingsModal.module.css';



export default function MarketSettingsModal(props) {

  return (
    <>
        <div className={css.container}>
            <a className={css.moreLink} href='/admin/owens-corning'>Go to templates</a>
            <a className={css.moreLink} href='/admin/create-template'>Create new template</a>
        </div>
    </>
  )
}
