import React, { useState, useEffect } from 'react';
import css from './Material.module.css';
import GradeDropdown from './GradeDropdown';

import firebase, { getAuth } from '../../../firebase';

import 'firebase/firestore';



export default function Shingles(props) {
    // collection name created with props.name
    const collectionName = `${props.name}-shingles`;
    console.log(collectionName)
    const [isCollectionEmpty, setCollectionEmpty] = useState(false)
    const [shingles, setShingles] = useState([]);
    const [edit, setEdit] = useState(null);
    const [newMargin, setNewMargin] = useState({
        grade: '',
        waste: '',
        mult: ''
    });

    const [newData, setNewData] = useState({
        grade: '',
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
        // structure can be taken from "owens-shingles collection"
        var docRef = db.collection("templates").doc(name);
        

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
        console.log("name props are ", props.name)
        shingleDbMatch()
      }, [])

      // READ index of shingles
    const shingleDbMatch = () => {
        // setIsLoading(true)
        // const q = firebase.firestore().collection('owens-shingles')
        // q.get().then(querySnapshot => {
        // const d = querySnapshot.docs.map(d => d.data())
        // //   console.log('data BIG ', d)
        // setShingles(d)
        // })

        const d = firebase.firestore().collectionGroup(collectionName)
        d.get().then(querySnapshot => {
            const d = querySnapshot.docs.map(d => d.data())
                if(d.length === 0) {
                    setCollectionEmpty(true)
                    console.log("empty query! nothing to see here")
                } else {
                    setShingles(d)
                }
                
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

        var docRef = db.collection("templates").doc(props.name).collection(collectionName).doc(name);
        let wastePercent;
        let newState = [...shingles];

        if (!newMargin.mult && !newMargin.waste && !newMargin.grade) {
            // end of function will reset form
            // no need to here
        } 
        else if (!newMargin.mult && !newMargin.waste) {
            docRef.set({
                grade: newMargin.grade
            }, { merge: true }); 
            newState[edit].grade = newMargin.grade
        } 
        else if (!newMargin.grade && !newMargin.waste) {
            docRef.set({
                multiplier: Number(newMargin.mult),
            }, { merge: true }); 
            newState[edit].multiplier = newMargin.mult
        } 
        else if (!newMargin.grade && !newMargin.mult) {
            wastePercent = (newMargin.waste * .01) + 1
            docRef.set({
                waste: wastePercent,
            }, { merge: true }); 
            newState[edit].waste = wastePercent
        } 
        else if (!newMargin.waste) {
            docRef.set({
                multiplier: Number(newMargin.mult),
                grade: newMargin.grade
            }, { merge: true }); 
            newState[edit].multiplier = newMargin.mult
        } 
        else if (!newMargin.mult) {
            wastePercent = (newMargin.waste * .01) + 1
            docRef.set({
                waste: wastePercent,
                grade: newMargin.grade
            }, { merge: true }); 
            newState[edit].waste = wastePercent
            newState[edit].grade = newMargin.grade
        } 
        else if (!newMargin.grade) {
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
        if (!newData.grade || !newData.waste || !newData.name || !newData.multiplier) {

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
            grade: newData.grade,
            name: newData.name,
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
            grade: '',
            name: '',
            multiplier: '',
            waste: ''
        })
        props.setFormOpen(false)
    }

    const newShingleForm = () => {
        return (
            <tr id={css.row}>
                <th className={css.name}><input onChange={(e)=>setNewData({...newData, name: e.target.value})} value={newData.name} id={css.nameInp} type='text' /></th>
                <th><GradeDropdown newData={newData} setNewData={setNewData}/></th>
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
            <th className={css.name}>{shingle.name}</th>
            <th></th>
            
            { (edit == i)
            ? <th className={css.waste}><GradeDropdown newData={newMargin} setNewData={setNewMargin}/></th>
            : <th className={css.waste}>{shingle.grade}</th>
            }

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