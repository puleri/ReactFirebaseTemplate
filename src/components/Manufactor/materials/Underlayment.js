import React, { useState, useEffect } from 'react';
import css from './Material.module.css';

import firebase, { getAuth } from '../../../firebase';

import 'firebase/firestore';
import UnitDropdown from '../UnitDropdown';



export default function Underlayment(props) {
    const collectionName = `${props.name}-underlayment`;
    const [underlay, setUnderlay] = useState([]);
    const [edit, setEdit] = useState(null);
    const [newMargin, setNewMargin] = useState({
        unit: '',
        actual: ''
    });

    const [newData, setNewData] = useState({
        name: '',
        actual: '',
        unit: ''
    })

    const [notification, setNotification] = useState({
        active: false,
        error: false,
        message: ''
    })

    
    useEffect(() => {
        underlayDbMatch()
      }, [])

      // READ index of underlay
    const underlayDbMatch = () => {
        // setIsLoading(true)
        const d = firebase.firestore().collectionGroup(collectionName)
        d.get().then(querySnapshot => {
            const d = querySnapshot.docs.map(d => d.data())
                if(d.length === 0) {
                    console.log("empty query! nothing to see here")
                } else {
                    setUnderlay(d)
                }
                
            })

        // setIsLoading(false)
    }
    const handleSelect = (i) => {
        setEdit(i)
        setNewMargin({
            actual: '',
            unit: ''
        })
    }
    const handleSubmit = () => {
        const db = firebase.firestore();
        const name = underlay[edit].name;
        console.log(newMargin)

        var docRef = db.collection("templates").doc(props.name).collection(collectionName).doc(name);
        let wastePercent;
        let newState = [...underlay];

        if (!newMargin.actual) {
            docRef.set({
                unit: newMargin.unit
            }, { merge: true }); 
            newState[edit].unit = newMargin.unit
        } 
        else if (!newMargin.unit) {
            docRef.set({
                actual: Number(newMargin.actual)
            }, { merge: true }); 
            newState[edit].actual = newMargin.actual
        } else {
            docRef.set({
                unit: newMargin.unit,
                actual: Number(newMargin.actual)
            }, { merge: true }); 
            newState[edit].actual = newMargin.actual
            newState[edit].unit = newMargin.unit
        }    
        
        // set local state to match DB
        setUnderlay(newState)

        // finally reset state and close inputs
        setEdit(null)
        setNewMargin({
            unit: '',
            actual: ''
        })
    }
    const handleCancel = () => {
        setEdit(null)
        setNewMargin({
            actual: '',
            unit: ''
        })
    }

    const handleCreateNew = () => {
        // on error
        if (!newData.actual || !newData.name || !newData.unit) {

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
        db.collection("templates").doc(props.name).collection(collectionName).doc(newData.name).set({
            name: newData.name,
            actual: Number(newData.actual),
            unit: newData.unit
        })
        .then(() => {
            props.setFormOpen(false)
            setNotification({
                active: true,
                error: false,
                message: 'Material successfully added!'
            })
            setNewData({
                name: '',
                actual: '',
                unit: ''
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
            name: '',
            actual: '',
            unit: ''
        })
        props.setFormOpen(false)
    }

    const handleDelete = (i) => {
        const name = underlay[i].name;
        const db = firebase.firestore();
        var docRef = db.collection("templates").doc(props.name).collection(collectionName).doc(name);
        docRef.delete().then(() => {
            console.log("Document successfully deleted!");
        })
        .then(() => {
            setNotification({
                active: true,
                error: false,
                message: 'Material successfully deleted!'
            })
            setTimeout(() => {
                setNotification({
                    active: false,
                    message: ''
                })
              }, "4000")
        })
        .catch((error) => {
            console.error("Error removing document: ", error);
        });
    }

    const newunderlayForm = () => {
        return (
            <tr id={css.row}>
                <th className={css.name}><input onChange={(e)=>setNewData({...newData, name: e.target.value})} value={newData.name} id={css.nameInp} type='text' /></th>
                <th></th>
                <th className={css.waste}><input onChange={(e)=>setNewData({...newData, actual: e.target.value})} value={newData.actual} id={css.multiInp} type='text' />&ensp;</th>
                <th><UnitDropdown newData={newData} setNewData={setNewData}/></th>

                <th className={css.cancel}><i onClick={()=>handleCancelForm()} className="fa-solid fa-rectangle-xmark"></i></th><th className={css.edit}><i onClick={()=>handleCreateNew()} className="fa-solid fa-circle-check"></i></th>  
            </tr>
        )  
    }

    const unitLabel = (unit) => {
        switch (unit){
            case "Roll":
                return "RL"
            case "Per Piece":
                return "PC"
            case "Each":
                return "EA"
            case "Lineal Feet":
                return "LF"
            case "Bundle":
                return "BD"
        }
    }

    const underlayIndex =
    underlay.map((underlay, i) =>
        <tr id={css.row} key={i}>
            <th className={css.name}>{underlay.name}</th>
            <th></th>
            <th></th>
            { (edit == i)
            ? <th className={css.waste}><input id={css.multiInp} value={newMargin.actual} onChange={(e) => setNewMargin({ ...newMargin, actual: e.target.value })} type='text' />&ensp;</th>
            : <th className={css.waste}>{underlay.actual} <span className={css.wasteLabel}>{unitLabel(underlay.unit)}</span><span id={css.x}></span></th>
            }

            { (edit == i)
            ? <th><UnitDropdown newMargin={newMargin} setNewMargin={setNewMargin} /> </th>
            : <th className={css.waste}>{underlay.unit}<span className={css.wasteLabel}>unit</span></th>
            }
            { (edit == i) 
            ? <><th className={css.cancel} onClick={() => handleCancel()}><i className="fa-solid fa-rectangle-xmark"></i></th><th className={css.edit} onClick={() => handleSubmit()}><i className="fa-solid fa-circle-check"></i></th></>
            : <th className={css.edit} onClick={() => handleSelect(i)}><i className="fa-solid fa-pen"></i></th>
            }
            { (edit == i) 
            ? <><th className={css.cancel}></th></>
            : <th className={css.edit} onClick={() => handleDelete(i)}><i className="fa-solid fa-trash"></i></th>
            }
       </tr>
    )

  

    return (
        <>
            { notification.active 
            ? <div className={notification.error ? css.error : css.success}>{notification.message}</div>
            : <></>
            }
            <div className={css.key}>&ensp; Actual Coverage &ensp; &ensp; | &ensp; &ensp; Unit</div>
            <div className={css.tableWrapper}>
                    {underlayIndex}
                    {props.formOpen ? newunderlayForm() : <></>}
            </div>
        </>
    )
}