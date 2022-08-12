import React, { useState } from 'react';
import Footer from '../Footer/Footer.js';
import Navbar from '../Navbar/Navbar.js';
import CinciShingles from './CinciShingles.js';
import css from './Market.module.css';
import NavMarket from './NavMarket.js';


export default function CinciMarket(props) {
    const [category, setCategory] = useState('Shingles')
    const [formOpen, setFormOpen] = useState(false)
    return (
        <>
            <Navbar/>
            <div className={css.container}>
                <h2 className={css.header}>Cincinnati 
                    <span className='total-users'>{category}</span>
                </h2>
                <button className={css.addNew} onClick={() => setFormOpen(true)}>+ Add New Shingle</button>

                <div className={css.content}>
                    <CinciShingles setFormOpen={setFormOpen} formOpen={formOpen}/>
                    <div className={css.footer}>
                    <Footer/>
                    </div>
                </div>
                
            </div>
            <NavMarket setCategory={setCategory}/>
            
        </>
    )
}