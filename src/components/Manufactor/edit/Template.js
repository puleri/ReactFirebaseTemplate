import React, { useState, useEffect } from 'react'
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


    const [markets, setMarkets] = useState([]);
    const [category, setCategory] = useState('Loading')
    const [formOpen, setFormOpen] = useState(false)
    const [templateTitle, setTemplateTitle] = useState('')
    const [urlSafeName, setURLSafeName] = useState('')
    const url = window.location.href;
    const lastPart = url.split('id=?')[1];
    const collectionName = `${lastPart}-activemarkets`;




    useEffect(() => {
        tepmlateNameFromURL()
        activeMarketsIndex()
      }, [])

    const activeMarketsIndex = () => {
    
        console.log('name is, ', collectionName)
        setCategory("Loading")
        setTimeout(setCategory("Active Markets"), 0)
        
        const d = firebase.firestore().collectionGroup(collectionName)
        d.get().then(querySnapshot => {
            const d = querySnapshot.docs.map(d => d.data())
                if(d.length === 0) {
                    console.log("empty query! nothing to see here")
                } else {
                    setMarkets(d)
                }
            })        
        // setIsLoading(false)
    }

    const tepmlateNameFromURL = () => {
        const db = firebase.firestore();

        setURLSafeName(lastPart)
        console.log(lastPart)
        var nameRef = db.collection('templates').doc(lastPart);
        nameRef.get().then((doc) => {
            if (doc.exists) {
                // console.log(doc.data().name)
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
                return <ActiveMarkets name={urlSafeName} markets={markets} setFormOpen={setFormOpen} formOpen={formOpen}/>
        }

    }

    return (
        <>
            <Navbar/>
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