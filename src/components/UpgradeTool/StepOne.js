import React from 'react';

export default function StepZero(props) {
  return (
    <>
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
    </>
  )
}
