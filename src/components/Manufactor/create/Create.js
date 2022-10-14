import React, { useState } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import Footer from '../../Footer/Footer.js';
import Navbar from '../../Navbar/Navbar.js';
import css from './Create.module.css';

import firebase, { getAuth } from '../../../firebase';


const Create = (props)  => {
    const [redirect, setRedirect] = useState(false)
    const [notification, setNotification] = useState({
        active: false,
        error: false,
        message: ''
    })
    const [newData, setNewData] = useState({
        name: ""
    });

    const handleCreateNew = () => {
        // on error
        if (!newData.name) {
            setNotification({
                active: true,
                error: true,
                message: 'Fill out name before submitting'
            })

            setTimeout(() => {
                setNotification({
                    active: false,
                    error: false,
                    message: ''
                })
              }, "4000")
              return
        }
        const db = firebase.firestore();
        // Add a new document in collection "cities"
        db.collection("templates").doc(newData.name).set({
            name: newData.name,
            atlanta: false,
            charlotte: false,
            cincinnati: false
        })
        .then(() => {
            props.setFormOpen(false)
            setNotification({
                active: true,
                error: false,
                message: 'Market added!'
            })
            setNewData({
                name: ''
            })
            setTimeout(() => {
                setNotification({
                    active: false,
                    message: ''
                })
              }, "4000")
            console.log("Document successfully written!");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
    }

    const create = (name) => {
        handleCreateNew()
        props.history.push('/admin/template-manager')

    }
    return (
        <>
            <Navbar/>
            { notification.active 
            ? <div className={notification.error ? css.error : css.success}>{notification.message}</div>
            : <></>
            }
            <div className={css.container}>
                <h2 className={css.header}>Create New Manufactor Template</h2>

                <div className={css.content}>
                    <h4 className={css.textLabel}>Manufacturer Name</h4>
                    <h4 className={css.subLabel}>Type the name of the manufacturer</h4>
                    <input value={newData.name} onChange={(e) => setNewData({ ...newData, name: e.target.value })} className={css.textInput} type='text' />
                    <button className={css.createBtn} onClick={()=>create()}>Create</button>
                
                    <div className={css.footer}>
                    </div>
                </div>

            </div>
            <Footer/>

        </>
    )
}
export default withRouter(Create);