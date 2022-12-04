import React, { useState } from 'react'
import Footer from '../../Footer/Footer.js';
import Navbar from '../../Navbar/Navbar.js';
import css from './Template.module.css'
import NavManufactor from '../NavManufactor.js'

import Shingles from '../materials/Shingles.js';
import RidgeCap from '../materials/RidgeCap.js';
import Starter from '../materials/Starter.js';
import Venting from '../materials/Venting.js';
import IceWater from '../materials/IceWater.js';
import Underlayment from '../materials/Underlayment.js';
import MetalEdge from '../materials/MetalEdge.js';
import ActiveMarkets from '../materials/ActiveMarkets.js';

import firebase from '../../../firebase';





export default function Template(props) {
    const [category, setCategory] = useState('Active Markets')
    const [formOpen, setFormOpen] = useState(false)
    const [templateTitle, setTemplateTitle] = useState('')
    const [urlSafeName, setURLSafeName] = useState('')

    const tepmlateNameFromURL = () => {
        const db = firebase.firestore();

        const url = window.location.href;
        // console.log(url)
        const lastPart = url.split('id=?')[1];
        console.log(lastPart)
        var nameRef = db.collection('templates').doc(lastPart);
        nameRef.get().then((doc) => {
            if (doc.exists) {
                // console.log(doc.data().name)
                setTemplateTitle(doc.data().name)
                setURLSafeName(lastPart)
                
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
                return <Shingles name={urlSafeName} setFormOpen={setFormOpen} formOpen={formOpen}/>
            
            case "Starter Strip":
                return <Starter name={urlSafeName} setFormOpen={setFormOpen} formOpen={formOpen}/>
            
            case "Ridge Cap":
                return <RidgeCap name={urlSafeName} setFormOpen={setFormOpen} formOpen={formOpen}/>

            case "Venting":
                return <Venting name={urlSafeName} setFormOpen={setFormOpen} formOpen={formOpen}/>

            case "Ice & Water Barrier":
                return <IceWater name={urlSafeName} setFormOpen={setFormOpen} formOpen={formOpen}/>
            
            case "Underlayment":
                return <Underlayment name={urlSafeName} setFormOpen={setFormOpen} formOpen={formOpen}/>
            
            case "Metal Edge":
                return <MetalEdge name={urlSafeName} setFormOpen={setFormOpen} formOpen={formOpen}/>
            
            case "Active Markets":
                return <ActiveMarkets name={urlSafeName} setFormOpen={setFormOpen} formOpen={formOpen}/>
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