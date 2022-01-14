import React from 'react'
import UpgradeTool from '../UpgradeTool/UpgradeTool.js';
import Navbar from '../Navbar/Navbar.js';
import { motion, AnimatePresence } from 'framer-motion';


export default function UpgradeNav() {
  return (
    <>
      <Navbar />
      <AnimatePresence exitBeforeEnter>
      <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }} >
      <UpgradeTool />
      </motion.div>
      </AnimatePresence>
    </>
  )
}
