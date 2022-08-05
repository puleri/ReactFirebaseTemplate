import React from 'react';
import Footer from '../Footer/Footer.js';
import Navbar from '../Navbar/Navbar.js';
import css from './Market.module.css';
import NavMarket from './NavMarket.js';


export default function CharMarket(props) {
    return (
        <>
            <Navbar/>
            <div className={css.container}>
            </div>
            <NavMarket/>
            <div className={css.footer}>
            <Footer/>
            </div>
        </>
    )
}