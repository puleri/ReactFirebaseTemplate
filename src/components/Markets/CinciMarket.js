import React, { useState } from 'react';
import Footer from '../Footer/Footer.js';
import Navbar from '../Navbar/Navbar.js';
import CinciShingles from './CinciShingles.js';
import css from './Market.module.css';
import NavMarket from './NavMarket.js';


export default function CinciMarket(props) {
    const [category, setCategory] = useState('Shingles')
    return (
        <>
            <Navbar/>
            <div className={css.container}>
                <h2 className={css.header}>Cincinnati <span className='total-users'>{category}</span></h2>
                <div className={css.content}>
                    <CinciShingles />
                </div>
            </div>
            <NavMarket setCategory={setCategory}/>
            <div className={css.footer}>
            <Footer/>
            </div>
        </>
    )
}