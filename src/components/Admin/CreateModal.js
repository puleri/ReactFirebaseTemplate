import React, { useState } from 'react';

import css from './CreateModal.module.css';

import firebase, { getAuth } from '../../firebase';

import 'firebase/firestore';
import MarketDropdown from './MarketDropdown';
import RoleDropdown from './RoleDropdown';


export default function CreateModal(props) {

    const [first, setFirst] = useState('')
    const [last, setLast] = useState('')
    const [email, setEmail] = useState('')
    const [market, setMarket] = useState('Local')
    const [role, setRole] = useState('')


    const [error, setError] = useState(
        // <div className="admin-tip2">
        //   <h5>Please fill out all fields before inviting user</h5>
        // </div>
      )

  

  return (
    <div className={props.show}>
        <div className={css.row}>
          <div className={css.glassContainer}>
            <div onClick={() => props.setCreateShow('no-help')} className={css.close}>
            <span>x</span>
            </div>

            <div className={css.contentWrapper}>
                <div className={css.contentContainer}>
                {props.error}
                    <div className="admin-form">
                        <div className="admin-input-group">
                        <h2 className={css.header}>Set New User Info</h2>
                        
                        <label className="admin-label" >first name</label>
                        <input type="text"
                            className="admin-input"
                            placeholder="Winston"
                            value={first}
                            onChange={(e) => setFirst(e.target.value)} />
                        </div>
                        <div className="admin-input-group">
                        <label className="admin-label" >last name</label>
                        <input type="text"
                            className="admin-input"
                            placeholder="Schmidt"
                            value={last}
                            onChange={(e) => setLast(e.target.value)} />
                        </div>
                        <div className="admin-input-group">
                        <label className="admin-label" >email</label>
                        <input type="email"
                            className="admin-input"
                            placeholder="wschmidt@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="admin-input-group">
                        <label className="admin-label" >market | wip*</label>
                        <MarketDropdown />
                        </div>
                        <div className="admin-input-group">
                        <label className="admin-label" >role</label>
                        <RoleDropdown setRole={setRole} />
                        </div>

                    </div>
          </div>
        </div>

          </div>
          <button onClick={() => props.setCreateShow('no-help')} className={css.cancel}>Close</button>
          <button
          className={css.adminSubmit}
          onClick={() => props.signUpUser(first, last, email, market, role)}>
          Invite
          </button>
        </div>
    </div>
  )
}
