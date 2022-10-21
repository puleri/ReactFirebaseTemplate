import React, { useState } from 'react'
import Footer from '../../Footer/Footer.js';
import Navbar from '../../Navbar/Navbar.js';
import css from './Template.module.css'
import NavManufactor from '../NavManufactor.js'

import OwenShingles from '../OwenShingles.js';
import OwenRidgeCap from '../OwenRidgeCap.js';
import OwenStarter from '../OwenStarter.js';
import OwenVenting from '../OwenVenting.js';
import OwenIceWater from '../OwenIceWater.js';
import OwenUnderlayment from '../OwenUnderlayment.js';
import OwenMetalEdge from '../OwenMetalEdge.js';
import OwenActive from '../OwenActive.js';

import firebase from '../../../firebase';





export default function Template(props) {
    const [category, setCategory] = useState('Active Markets')
    const [formOpen, setFormOpen] = useState(false)
    const [templateTitle, setTemplateTitle] = useState('')

    const tepmlateNameFromURL = () => {
        const db = firebase.firestore();

        const url = window.location.href;
        const lastPart = url.split('id=?')[1];
        var nameRef = db.collection(lastPart).doc('template-name');
        nameRef.get().then((doc) => {
            if (doc.exists) {
                setTemplateTitle(doc.data().name)
                
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });

    }

    const shownContent = () => {
        switch (category){
            case "Shingle": 
                return <OwenShingles setFormOpen={setFormOpen} formOpen={formOpen}/>
            
            case "Starter Strip":
                return <OwenStarter setFormOpen={setFormOpen} formOpen={formOpen}/>
            
            case "Ridge Cap":
                return <OwenRidgeCap setFormOpen={setFormOpen} formOpen={formOpen}/>

            case "Venting":
                return <OwenVenting setFormOpen={setFormOpen} formOpen={formOpen}/>

            case "Ice & Water Barrier":
                return <OwenIceWater setFormOpen={setFormOpen} formOpen={formOpen}/>
            
            case "Underlayment":
                return <OwenUnderlayment setFormOpen={setFormOpen} formOpen={formOpen}/>
            
            case "Metal Edge":
                return <OwenMetalEdge setFormOpen={setFormOpen} formOpen={formOpen}/>
            
            case "Active Markets":
                return <OwenActive setFormOpen={setFormOpen} formOpen={formOpen}/>
        }

    }

    return (
        <>
            <Navbar/>
            {  tepmlateNameFromURL() }
            <div className={css.container}>
                <h2 className={css.header}>{templateTitle} 
                    <span className='total-users'>{category}</span>
                </h2>
                <button className={css.addNew} onClick={() => setFormOpen(true)}>+ Add New {category}</button>

                <div className={css.content}>
                    {shownContent()}
                    <div className={css.footer}>
                    <Footer/>
                    </div>
                </div>
                
            </div>
            <NavManufactor setCategory={setCategory}/>

        </>
    )
}