import React from 'react';
import css from './NavMarket.module.css';

// icons
import iceWaterIcon from "./icons/iceWaterIcon.png"
import metalEdgeIcon from "./icons/metalEdgeIcon.png"
import ridgeCapIcon from "./icons/ridgeCapIcon.png"
import ridgeVentIcon from "./icons/ridgeVentIcon.png"
import shingleIcon from "./icons/shingleIcon.png"
import starterIcon from "./icons/starterIcon.png"


export default function NavMarket(props) {
    return (
        <>
        <div className={css.br}></div>

        <div className={css.wrapper}>
            <div className={css.container}>
                <h3 className={css.header}>kaiser</h3>
                <div className={css.iconWrapper}>
                    <img className={css.icon} src={shingleIcon} alt="shingle icon"/>
                    <p className={css.label}>shingle</p>
                </div>
                <div className={css.iconWrapper}>
                    <img className={css.icon3} src={starterIcon} alt="starter strip icon"/>
                    <p className={css.label}>starter</p>
                </div>
                <div className={css.iconWrapper}>
                    <img className={css.icon3} src={ridgeCapIcon} alt="ridge cap icon"/>
                    <p className={css.label}>ridge cap</p>
                </div>
                <div className={css.iconWrapper}>
                    <img className={css.icon2} src={iceWaterIcon} alt="ice water icon"/>
                    <p className={css.label}>ice & water</p>
                </div>
                <div className={css.iconWrapper}>
                    <img className={css.icon} src={metalEdgeIcon} alt="metal edge icon"/>
                    <p className={css.label}>metal edge</p>
                </div>
                <div className={css.iconWrapper}>
                    <img className={css.icon4} src={ridgeVentIcon} alt="ridge vent icon"/>
                    <p className={css.label}>ridge vent</p>
                </div>
             
            </div>
        </div>
        </>
    )
}