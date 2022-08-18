// import React, { useState } from 'react'
// import Footer from '../Footer/Footer.js';
// import Navbar from '../Navbar/Navbar.js';
// import css from './Manufactor.module.css'
// import NavMarket from '../Markets/NavMarket.js'

// export default function Manufactor(props) {
//     const [category, setCategory] = useState('Shingles')
//     const [formOpen, setFormOpen] = useState(false)

//     return (
//         <>
//             <Navbar/>
//             <div className={css.container}>
//                 <h2 className={css.header}>Create New Manufactor 
//                     <span className='total-users'></span>
//                 </h2>
//                 <button className={css.addNew} onClick={() => setFormOpen(true)}>+ Add New Shingle</button>

//                 <div className={css.content}>
//                     <div className={css.footer}>
//                     <Footer/>
//                     </div>
//                 </div>
                
//             </div>
//             <NavMarket setCategory={setCategory}/>

//         </>
//     )
// }