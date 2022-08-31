import React from 'react';
import css from './NavManufactor.module.css';

// icons
import iceWaterIcon from "./icons/iceWaterIcon.png"
import metalEdgeIcon from "./icons/metalEdgeIcon.png"
import ridgeCapIcon from "./icons/ridgeCapIcon.png"
import ridgeVentIcon from "./icons/ridgeVentIcon.png"
import shingleIcon from "./icons/shingleIcon.png"
import starterIcon from "./icons/starterIcon.png"
import underlaymentIcon from "./icons/underlaymentIcon.png"
import activeIcon from "./icons/activeIcon.png"




export default function NavManufactor(props) {
    return (
        <>
        <div className={css.br}></div>

        <div className={css.wrapper}>
            <div className={css.container}>
                <h3 className={css.header}>kaiser</h3>
                <div onClick={() => props.setCategory('Active Markets')} className={css.iconWrapper}>
                    <img className={css.icon4} src={activeIcon} alt="shingle icon"/>
                    <p className={css.label}>markets</p>
                </div>
                <div onClick={() => props.setCategory('Shingle')} className={css.iconWrapper}>
                    <img className={css.icon} src={shingleIcon} alt="shingle icon"/>
                    <p className={css.label}>shingle</p>
                </div>
                <div onClick={() => props.setCategory('Starter Strip')} className={css.iconWrapper}>
                    <img className={css.icon4} src={starterIcon} alt="starter strip icon"/>
                    <p className={css.label}>starter</p>
                </div>
                <div onClick={() => props.setCategory('Ridge Cap')} className={css.iconWrapper}>
                    <img className={css.icon3} src={ridgeCapIcon} alt="ridge cap icon"/>
                    <p className={css.label}>ridge cap</p>
                </div>
                <div onClick={() => props.setCategory('Ice & Water Barrier')} className={css.iconWrapper}>
                    <img className={css.icon2} src={iceWaterIcon} alt="ice water icon"/>
                    <p className={css.label}>ice & water</p>
                </div>
                <div onClick={() => props.setCategory('Metal Edge')} className={css.iconWrapper}>
                    <img className={css.icon} src={metalEdgeIcon} alt="metal edge icon"/>
                    <p className={css.label}>metal edge</p>
                </div>
                <div onClick={() => props.setCategory('Underlayment')} className={css.iconWrapper}>
                    <img className={css.icon5} src={underlaymentIcon} alt="underlayment icon"/>
                    <p className={css.label}>underlayment</p>
                </div>
                <div onClick={() => props.setCategory('Venting')} className={css.iconWrapper}>
                    <img className={css.icon4} src={ridgeVentIcon} alt="ridge vent icon"/>
                    <p className={css.label}>venting</p>
                </div>
             
            </div>
        </div>
        </>
    )
}