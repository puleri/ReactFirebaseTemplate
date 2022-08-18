import React, { useState } from 'react'
import Footer from '../Footer/Footer.js';
import Navbar from '../Navbar/Navbar.js';
import css from './Manufactor.module.css'
import NavMarket from '../Markets/NavMarket.js'
import OwenShingles from './OwenShingles.js';
import OwenRidgeCap from './OwenRidgeCap.js';
import OwenStarter from './OwenStarter.js';


export default function OwensCorning(props) {
    const [category, setCategory] = useState('Shingle')
    const [formOpen, setFormOpen] = useState(false)

    const shownContent = () => {
        switch (category){
            case "Shingle": 
                return <OwenShingles setFormOpen={setFormOpen} formOpen={formOpen}/>
            
            case "Starter Strip":
                return <OwenStarter setFormOpen={setFormOpen} formOpen={formOpen}/>
            
            case "Ridge Cap":
                return <OwenRidgeCap setFormOpen={setFormOpen} formOpen={formOpen}/>

        }

    }

    return (
        <>
            <Navbar/>
            <div className={css.container}>
                <h2 className={css.header}>Owens Corning 
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
            <NavMarket setCategory={setCategory}/>

        </>
    )
}