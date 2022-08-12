import React, { useState, useEffect } from 'react';
import css from './Market.module.css';

import firebase, { getAuth } from '../../firebase';

import 'firebase/firestore';



export default function CinciShingles(props) {
    const [shingles, setShingles] = useState([]);
    const [edit, setEdit] = useState(null);
    const [newMargin, setNewMargin] = useState({
        waste: '',
        mult: ''
    });

    const [newData, setNewData] = useState({
        available: false,
        name: '',
        multiplier: '',
        waste: ''
    })

    const [notification, setNotification] = useState({
        active: false,
        error: false,
        message: ''
    })

    const handleAvail = (name, index) => {
        const db = firebase.firestore();
        let status;
        var docRef = db.collection("cin-shingles").doc(name);

        docRef.get().then((doc) => {
            if (doc.exists) {
                status = doc.data().available

                docRef.set({
                    available: !status
                }, { merge: true }); 
                
                let newState = [...shingles];

                let stateStatus = newState[index].available;
                newState[index].available = !stateStatus;
                setShingles(newState);

                // console.log("Document data:", doc.data().available);
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }   
    
    useEffect(() => {
        shingleDbMatch()
      }, [])

      // READ index of shingles
    const shingleDbMatch = () => {
        // setIsLoading(true)
        const q = firebase.firestore().collection('cin-shingles')
        q.get().then(querySnapshot => {
        const d = querySnapshot.docs.map(d => d.data())
        //   console.log('data BIG ', d)
        setShingles(d)
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
    const handleSubmit = () => {
        const db = firebase.firestore();
        const name = shingles[edit].name;

        console.log(!newMargin.mult + " " + !newMargin.waste)

        var docRef = db.collection("cin-shingles").doc(name);
        let wastePercent;
        let newState = [...shingles];

        if (!newMargin.mult && !newMargin.waste) {
            // end of function will reset form
            // no need to here
        } 
        else if (!newMargin.waste) {
            docRef.set({
                multiplier: Number(newMargin.mult)
            }, { merge: true }); 
            newState[edit].multiplier = newMargin.mult
        } 
        else if (!newMargin.mult) {
            wastePercent = (newMargin.waste * .01) + 1
            docRef.set({
                waste: wastePercent,
            }, { merge: true }); 
            newState[edit].waste = wastePercent
        } 
        else {
            wastePercent = (newMargin.waste * .01) + 1
            docRef.set({
                waste: wastePercent,
                multiplier: Number(newMargin.mult)
            }, { merge: true }); 
            newState[edit].multiplier = newMargin.mult
            newState[edit].waste = wastePercent
        }
        
        
        // set local state to match DB
        setShingles(newState)

        // finally reset state and close inputs
        setEdit(null)
        setNewMargin({
            waste: '',
            mult: ''
        })
    }
    const handleCancel = () => {
        setEdit(null)
        setNewMargin({
            waste: '',
            mult: ''
        })
    }

    const handleCreateNew = () => {
        let newWastePercent = (newData.waste* .01) + 1;
        // on error
        if (!newData.waste || !newData.name || !newData.multiplier) {

            setNotification({
                active: true,
                error: true,
                message: 'Fill out all fields before submitting'
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
        db.collection("cin-shingles").doc(newData.name).set({
            name: newData.name,
            available: newData.available,
            waste: newWastePercent,
            multiplier: Number(newData.multiplier)
        })
        .then(() => {
            props.setFormOpen(false)
            setNotification({
                active: true,
                error: false,
                message: 'Material successfully added!'
            })
            setNewData({
                available: false,
                name: '',
                multiplier: '',
                waste: ''
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
            available: false,
            name: '',
            multiplier: '',
            waste: ''
        })
        props.setFormOpen(false)
    }

    const newShingleForm = () => {
        return (
            <tr id={css.row}>
                <th><label onClick={()=>setNewData({...newData, available: !newData.available})}className={css.toggle} for="myToggle"> <input className={css.toggle__input} name="" type="checkbox" id={css.myToggle} checked={newData.available}/><div className={css.toggle__fill}></div></label>
                </th>
                <th className={css.name}><input onChange={(e)=>setNewData({...newData, name: e.target.value})} value={newData.name} id={css.nameInp} type='text' /></th>
                <th></th>
                <th></th>
                <th className={css.waste}><input onChange={(e)=>setNewData({...newData, multiplier: e.target.value})} value={newData.multiplier} id={css.multiInp} type='text' />&ensp;<i id={css.cash} className="fa-solid fa-calculator"></i></th>
                <th className={css.waste}> <input onChange={(e)=>setNewData({...newData, waste: e.target.value})} value={newData.waste} id={css.wasteInp} type='text' /> %<span className={css.wasteLabel}>WF</span></th>
                <th className={css.cancel}><i onClick={()=>handleCancelForm()} className="fa-solid fa-rectangle-xmark"></i></th><th className={css.edit}><i onClick={()=>handleCreateNew()} className="fa-solid fa-circle-check"></i></th>  
            </tr>
        )  
    }

    const shinglesIndex =
    shingles.map((shingle, i) =>
        <tr id={css.row} key={i}>
            <th><label onClick={() => handleAvail(shingle.name, i)} className={css.toggle} for="myToggle"> <input onChange={() => handleAvail(shingle.name, i)} className={css.toggle__input} name="" type="checkbox" id={css.myToggle} checked={shingles[i].available === true}/><div className={css.toggle__fill}></div></label>
            </th>
            <th className={css.name}>{shingle.name}</th>
            <th></th>
            <th></th>
            { (edit == i)
            ? <th className={css.waste}><input id={css.multiInp} value={newMargin.mult} onChange={(e) => setNewMargin({ ...newMargin, mult: e.target.value })} type='text' />&ensp;<i id={css.cash} className="fa-solid fa-calculator"></i></th>
            : <th className={css.waste}>{shingle.multiplier}<span id={css.x}>x</span><i id={css.cash} className="fa-solid fa-calculator"></i></th>
            }

            { (edit == i)
            ? <th className={css.waste}> <input id={css.wasteInp} value={newMargin.waste} onChange={(e) => setNewMargin({ ...newMargin, waste: e.target.value })} type='text' /> %<span className={css.wasteLabel}>WF</span></th>
            : <th className={css.waste}> {Math.round(shingle.waste * 10 * 10 - 100)} %<span className={css.wasteLabel}>WF</span></th>
            }
            { (edit == i) 
            ? <><th className={css.cancel} onClick={() => handleCancel()}><i className="fa-solid fa-rectangle-xmark"></i></th><th className={css.edit} onClick={() => handleSubmit()}><i className="fa-solid fa-circle-check"></i></th></>
            : <th className={css.edit} onClick={() => handleSelect(i)}><i className="fa-solid fa-pen"></i></th>
            }
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