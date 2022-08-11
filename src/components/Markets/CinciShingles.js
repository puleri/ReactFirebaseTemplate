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
    //edit holds index of edit
    //submit changes in newMargin on update

    const shinglesIndex =
    shingles.map((shingle, i) =>
        <tr id={css.row} key={i}>
            <th><label onClick={() => handleAvail(shingle.name, i)} className={css.toggle} for="myToggle"> <input onChange={() => handleAvail(shingle.name, i)} className={css.toggle__input} name="" type="checkbox" id={css.myToggle} checked={shingles[i].available === true}/><div className={css.toggle__fill}></div></label>
            </th>
            <th className={css.name}>{shingle.name}</th>
            <th></th>
            <th></th>
            { (edit == i)
            ? <th className={css.waste}><input id={css.multiInp} value={newMargin.mult} onChange={(e) => setNewMargin({ ...newMargin, mult: e.target.value })} type='text' />&ensp;<i id={css.cash} class="fa-solid fa-calculator"></i></th>
            : <th className={css.waste}>{shingle.multiplier}<span id={css.x}>x</span><i id={css.cash} class="fa-solid fa-calculator"></i></th>
            }

            { (edit == i)
            ? <th className={css.waste}> <input id={css.wasteInp} value={newMargin.waste} onChange={(e) => setNewMargin({ ...newMargin, waste: e.target.value })} type='text' /> %<span className={css.wasteLabel}>WF</span></th>
            : <th className={css.waste}> {Math.round(shingle.waste * 10 * 10 - 100)} %<span className={css.wasteLabel}>WF</span></th>
            }
            { (edit == i) 
            ? <><th className={css.cancel} onClick={() => handleCancel()}><i class="fa-solid fa-rectangle-xmark"></i></th><th className={css.edit} onClick={() => handleSubmit()}><i class="fa-solid fa-circle-check"></i></th></>
            : <th className={css.edit} onClick={() => handleSelect(i)}><i class="fa-solid fa-pen"></i></th>
            } 
       </tr>
    )
    return (
        <>
            <div className={css.key}><i id={css.cash} class="fa-solid fa-calculator"></i>&ensp; Cash multiplier &ensp; &ensp; | &ensp; &ensp; <span className={css.wasteKey}>WF &ensp;</span> Waste factor</div>
           <div className={css.tableWrapper}>
                {shinglesIndex}
           </div>
        </>
    )
}