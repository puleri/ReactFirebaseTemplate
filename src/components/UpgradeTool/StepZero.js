import React from 'react';

export default function StepZero(props) {

  return (
    <>
    <h1 className="surv-header">Homeowner Information</h1>
    <div className="form-group">
    <label>Job #</label>
    <input
    type="text"
    value={props.roofTemplate.job}
    onChange={(e) => props.setRoofTemplate({ ...props.roofTemplate, job: e.target.value })}
    />
    <label>Name</label>
    <input
    type="text"
    value={props.roofTemplate.name}
    onChange={(e) => props.setRoofTemplate({ ...props.roofTemplate, name: e.target.value })}
    />

    </div>
    </>
  )
}
