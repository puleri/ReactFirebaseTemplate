import React, { useState, useEffect } from 'react';
import css from './Market.module.css';

import firebase, { getAuth } from '../../firebase';

import 'firebase/firestore';



export default function CinciShingles(props) {
    const [shingles, setShingles] = useState([]);
    const [edit, setEdit] = useState(null);

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
    const shinglesIndex =
    shingles.map((shingle, i) =>
        <tr id={css.row} key={i}>
            <th><label onClick={() => handleAvail(shingle.name, i)} className={css.toggle} for="myToggle"> <input onChange={() => handleAvail(shingle.name, i)} className={css.toggle__input} name="" type="checkbox" id={css.myToggle} checked={shingles[i].available === true}/><div className={css.toggle__fill}></div></label>
            </th>
            <th className={css.name}>{shingle.name}</th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          
            <th className={css.waste}>{shingle.multiplier}&ensp;<i id={css.cash} class="fa-solid fa-calculator"></i></th>
            <th className={css.waste}> {(shingle.waste * 10 * 10 - 100)}%<span className={css.wasteLabel}>WF</span></th>
            { (edit == i) ? <th className={css.edit} onClick={() => setEdit(null)}><i class="fa-solid fa-circle-check"></i></th>
 : <th className={css.edit} onClick={() => setEdit(i)}><i class="fa-solid fa-pen"></i></th>
}        </tr>
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