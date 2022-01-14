import React from 'react';
import { motion } from 'framer-motion';

export default function StepZero(props) {
  return (
    <motion.div
      initial={{ x:'100vw'}}
      animate={{ x: 0}}
      transition={{duration:0.5}}
    >
    <h1 className="surv-header">Roof Measurement</h1>
    <div className="form-group">
    <label>Manual Entry</label>
    <input
    style={{ width:"20px", height: "20px" }}
    type="radio"
    name="roofMeasurement"
    value="manual"
    checked={props.roofTemplate.roofMeasurement === 'manual'}
    onChange={props.handleMeasurementChange}
    />
    {
    //   <label>.XML Upload</label>
    // <input
    // style={{ width:"20px", height: "20px" }}
    // type="radio"
    // name="roofMeasurement"
    // value="xml"
    // checked={props.roofTemplate.roofMeasurement === 'xml'}
    // onChange={props.handleMeasurementChange}
    // />
  }
    </div>
    </motion.div>
  )
}
