import React, { useState } from 'react';
import './UpgradeTool.css';

export default function UpgradeTool() {

  const [roofTemplate, setRoofTemplate] = useState({ step: 1 })

  const handlePrev =  () => setRoofTemplate({
    ...roofTemplate,
    step: roofTemplate.step - 1
  })

  const handleNext =  () => setRoofTemplate({
    ...roofTemplate,
    step: roofTemplate.step + 1
  })

  switch (roofTemplate.step) {
    default:
    case 1:
        return (
          <>
            <h1>Homeowner Information</h1>
            <div className="form-group">
              <label>Job #</label>
              <input
              type="text"
              />
              <label>Name</label>
              <input
              type="text"
              />
              <button onClick={() => handleNext()}>Next</button>
            </div>
          </>
        )
    case 2:
        return (
          <>
          <h1>Roof Measurement</h1>
          <div className="form-group">
            <label>Manual Entry</label>
            <input
            style={{ width:"40px", height: "40px" }}
            type="checkbox"

            />
            <label>.XML Upload</label>
            <input
            style={{ width:"40px", height: "40px" }}
            type="checkbox"

            />
            <button onClick={() => handlePrev()}>Previous</button>
            <button onClick={() => handleNext()}>Next</button>
          </div>
          </>
        )
    // return (
    //   <>
    //     <h1>Upgrade Tool</h1>
    //     <div className="header-hero">
    //       <h1 style={{ color: 'white' }}>Roof Measurement</h1>
    //       <p>All measurements recorded in square feet</p>
    //     </div>
    //     <div className="Template-container">
    //       <form className="roof-measurement-form">
    //         <div className="form-group">
    //           <label>Total Roof Area</label>
    //           <input
    //           type="number"
    //           />
    //         </div>
    //         <div className="form-group">
    //           <label>Ridge</label>
    //           <input
    //           type="number"
    //           />
    //         </div>
    //         <div className="form-group">
    //           <label>Hip</label>
    //           <input
    //           type="number"
    //           onChange={(e) => {
    //             setRoofTemplate({ ...roofTemplate, hip: e.target.value})
    //           }}/>
    //         </div>
    //         <div className="form-group">
    //           <label>Valley</label>
    //           <input
    //           type="number"
    //           onChange={(e) => {
    //             setRoofTemplate({ ...roofTemplate, valley: e.target.value})
    //           }}/>
    //         </div>
    //         <div className="form-group">
    //           <label>Rake</label>
    //           <input
    //           type="number"
    //           onChange={(e) => {
    //             setRoofTemplate({ ...roofTemplate, rake: e.target.value})
    //           }}/>
    //         </div>
    //         <div className="form-group">
    //           <label>Eave</label>
    //           <input
    //           type="number"
    //           onChange={(e) => {
    //             setRoofTemplate({ ...roofTemplate, eave: e.target.value})
    //           }}/>
    //         </div>
    //         <div className="form-group">
    //           <label>Counter Flashing</label>
    //           <input
    //           type="number"
    //           onChange={(e) => {
    //             setRoofTemplate({ ...roofTemplate, counterFlashing: e.target.value})
    //           }}/>
    //         </div>
    //         <div className="form-group">
    //           <label>Step Flashing</label>
    //           <input
    //           type="number"
    //           onChange={(e) => {
    //             setRoofTemplate({ ...roofTemplate, stepFlashing: e.target.value})
    //           }}/>
    //         </div>
    //         <div className="form-group">
    //           <label>Parapets</label>
    //           <input
    //           type="number"
    //           onChange={(e) => {
    //             setRoofTemplate({ ...roofTemplate, parapets: e.target.value})
    //           }}
    //           />
    //         </div>
    //         <div className="form-group">
    //           <label>Existing Roof?</label>
    //           <input
    //           style={{ width:"40px", height: "40px" }}
    //           type="checkbox"
    //
    //           />
    //         </div>
    //         <div className="form-group">
    //           <label>Roof Type</label>
    //           <select
    //           name="roof_type"
    //           id="roof_type"
    //           size="1"
    //           onChange={(e) => setRoofTemplate({ ...roofTemplate, roofType: e.target.value})}>
    //             <option value="select">Select type</option>
    //             <option value="gable">Gable</option>
    //             <option value="hip">Hip</option>
    //             <option value="mansard">Mansard</option>
    //             <option value="dutch_hip">Dutch Hip</option>
    //             <option value="gambrel">Gambrel</option>
    //             <option value="flat">Flat</option>
    //             <option value="shed">Shed</option>
    //           </select>
    //         </div>
    //         <div className="form-group">
    //           <label>Existing Shingle</label>
    //           <select
    //           name="existing_shingle"
    //           id="roof_type"
    //           size="1"
    //           onChange={(e) => setRoofTemplate({ ...roofTemplate, existingShingle: e.target.value})}>
    //             <option value="select">Select shingle</option>
    //             <option value="3-tab">3-Tab</option>
    //             <option value="laminate">Laminate</option>
    //           </select>
    //         </div>
    //
    //       </form>
    //     </div>
    //     </>
    // )
  }
}
