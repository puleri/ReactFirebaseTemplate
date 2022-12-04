import React, { useState, useEffect } from 'react';
import css from './Material.module.css';

import firebase, { getAuth } from '../../../firebase';
import 'firebase/firestore';



export default function ActiveMarkets(props) {
    const [templateName, setTemplateName] = useState('')
    const [shingles, setShingles] = useState([]);
    const [edit, setEdit] = useState(null);
    const [newMargin, setNewMargin] = useState({
        waste: '',
        mult: ''
    });

    const [newData, setNewData] = useState({
        active: false,
        name: '',
        multiplier: '',
        waste: ''
    })

    const [notification, setNotification] = useState({
        active: false,
        error: false,
        message: ''
    })
    const url = window.location.href;
    const lastPart = url.split('id=?')[1];


    const handleAvail = (name, index) => {
        const db = firebase.firestore();
        let status;
        var docRef = db.collection("templates").doc(lastPart).collection('activeMarkets').doc(name);

        docRef.get().then((doc) => {
            if (doc.exists) {
                status = doc.data().active

                docRef.set({
                    active: !status
                }, { merge: true }); 
                
                let newState = [...shingles];

                let stateStatus = newState[index].active;
                newState[index].active = !stateStatus;
                setShingles(newState);

                // console.log("Document data:", doc.data().active);
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }   
    
    useEffect(() => {
        activeMarketsIndex()
      }, [])

      // READ index of markets
    const activeMarketsIndex = () => {

        // setIsLoading(true)
        const q = firebase.firestore().collectionGroup('activeMarkets')

        q.get().then(querySnapshot => {
        const d = querySnapshot.docs.map(d => d.data())
          console.log('data BIG ', d)

          const uniqueIds = new Set();
          const unique = d.filter(element => {
            const isDuplicate = uniqueIds.has(element.name);
            if (!isDuplicate) {
              uniqueIds.add(element.name);
              return true;
            }
            return false;
          });
          console.log(unique)
        setShingles(unique)
        })
        // setIsLoading(false)
    }
    const handleSelect = (i) => {
        setEdit(i)
        setNewMargin({
            waste: '',
            mult: ''
        })
    }

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
        db.collection("templates").doc(lastPart).collection('activeMarkets').doc(newData.name).set({
            name: newData.name,
            active: newData.active,
        })
        .then(() => {
            props.setFormOpen(false)
            setNotification({
                active: true,
                error: false,
                message: 'Market added!'
            })
            setNewData({
                active: false,
                name: '',
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
    const handleCancelForm = () => {
        setNewData({
            active: false,
            name: '',
        })
        props.setFormOpen(false)
    }

    const newShingleForm = () => {
        return (
            <tr id={css.row}>
                <th><label onClick={()=>setNewData({...newData, active: !newData.active})}className={css.toggle} for="myToggle"> <input className={css.toggle__input} name="" type="checkbox" id={css.myToggle} checked={newData.active}/><div className={css.toggle__fill}></div></label>
                </th>
                <th className={css.name}><input onChange={(e)=>setNewData({...newData, name: e.target.value})} value={newData.name} id={css.nameInp} type='text' /></th>
                <th></th>
                <th></th>
                <th className={css.cancel}><i onClick={()=>handleCancelForm()} className="fa-solid fa-rectangle-xmark"></i></th><th className={css.edit}><i onClick={()=>handleCreateNew()} className="fa-solid fa-circle-check"></i></th>  
            </tr>
        )  
    }

    const shinglesIndex =
    shingles.map((shingle, i) =>
        <tr id={css.row} key={i}>
            <th><label onClick={() => handleAvail(shingle.name, i)} className={css.toggle} for="myToggle"> <input onChange={() => handleAvail(shingle.name, i)} className={css.toggle__input} name="" type="checkbox" id={css.myToggle} checked={shingles[i].active === true}/><div className={css.toggle__fill}></div></label>
            </th>
            <th className={css.name}>{shingle.name}</th>
            <th></th>
            <th></th>
       </tr>
    )
    return (
        <>
            { notification.active 
            ? <div className={notification.error ? css.error : css.success}>{notification.message}</div>
            : <></>
            }
            <div className={css.key}><i id={css.cash} className="fa-solid fa-calculator"></i>&ensp; Cash multiplier &ensp; &ensp; | &ensp; &ensp; <span className={css.wasteKey}>WF &ensp;</span> Waste factor</div>
            <div className={css.tableWrapper}>
                    {shinglesIndex}
                    {props.formOpen ? newShingleForm() : <></>}
            </div>
        </>
    )
}