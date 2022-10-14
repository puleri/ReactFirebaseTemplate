import React, { useState, useEffect } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import Footer from '../../Footer/Footer.js';
import Navbar from '../../Navbar/Navbar.js';
import firebase from '../../../firebase';

import icon from './icon.png'
import css from './TemplateManager.module.css'

const TemplateManager = (props)  => {
    const [redirect, setRedirect] = useState(false)
    const [templates, setTemplates] = useState([])

    const templateIndex = () => {
        // setIsLoading(true)
        const q = firebase.firestore().collection('templates')
        q.get()
            .then(querySnapshot => {
            const d = querySnapshot.docs.map(d => d.data())
            // console.log('data BIG ', d)
            setTemplates(d)
             })
            .then(console.log(templates))
            .catch(e => console.log(e))
        // setIsLoading(false)
        
    }

    const templateHTML =
    templates.map((template, i) =>
        <div className={css.posAbs}>
        <div className={css.flexCol}>
        <tr id={css.row} key={i}>
            <th className={css.name}>{template.name}</th>
            <th></th>
            <th></th>
            <th>
                <input type='checkbox' id={css.firstBox} checked={template.cincinnati}/>
                <input type='checkbox' id={css.middleBox} checked={template.charlotte}/>
                <input type='checkbox' id={css.lastBox} checked={template.atlanta}/>
            </th>
       </tr>
       </div>
       <br />
       <br />
       <br />
       </div>

    )

    useEffect(() => {
        templateIndex()
    }, [])

    return (
        <>
            <Navbar/>
            <div className={css.container}>
                <h2 className={css.header}>Template Manager</h2>
                <button className={css.addNew} onClick={() => props.history.push('/admin/create-template')}>+ Create New Template</button>


                <div className={css.content}>
                    <div className={css.row1}>
                        <h4 className={css.textLabel}>Manufacturer</h4>
                        <div className={css.column}>
                            <h4 className={css.rightLabel}>Active Markets</h4>
                        </div>
                    </div>
                    <div className={css.row2}>
                        <h4 className={css.subLabel}>Name</h4>
                        <div className={css.headerSpacer}>
                            <h4 className={css.tableHeader}>Cincinnati</h4>
                            <h4 className={css.tableHeader}>Charlotte</h4>
                            <h4 className={css.tableHeader}>Atlanta</h4>
                        </div>
                    </div>
                    <div className={css.posRel}>
                        {templateHTML}
                        <tr className={css.lastRow}></tr>
                        <tr></tr>

                    </div>

                    <img src={icon} alt="kaiser icon" className={css.icon} />
                
                    <div className={css.footer}>
                    </div>
                </div>

            </div>
            <Footer/>

        </>
    )
}
export default withRouter(TemplateManager);