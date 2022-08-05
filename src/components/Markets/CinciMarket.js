import React from 'react';
import Footer from '../Footer/Footer.js';
import Navbar from '../Navbar/Navbar.js';
import css from './Market.module.css';
import NavMarket from './NavMarket.js';


export default function CinciMarket(props) {
    return (
        <>
            <Navbar/>
            <div className={css.container}>
                <h2 className={css.header}>Cincinnati</h2>
                <div className={css.content}>
                    
                </div>
            </div>
            <NavMarket/>
            <div className={css.footer}>
            <Footer/>
            </div>
        </>
    )
}