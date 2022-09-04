import React, { useState } from 'react';

import css from './MarketSettingsModal.module.css';



export default function MarketSettingsModal(props) {

  return (
    <>
        <div className={css.container}>
            <a className={css.moreLink} href='/admin/owens-corning'>Go to template</a>
            <a className={css.moreLink} href='/admin/certainteed'>CertainTeed</a>
        </div>
    </>
  )
}
