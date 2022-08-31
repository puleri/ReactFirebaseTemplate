import React, { useState } from 'react';

import css from './MarketSettingsModal.module.css';



export default function MarketSettingsModal(props) {

  return (
    <>
        <div className={css.container}>
            <a href='/admin/owens-corning'>Go to template</a>
            <a href='/admin/owens-corning'>Manage active markets</a>
        </div>
    </>
  )
}
