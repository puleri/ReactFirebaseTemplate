import React, { useState } from 'react';
import './UpgradeTool.css';

export default function UpgradeTool() {

  const [roofTemplate, setRoofTemplate] = useState({
    step: 1,
    job: "",
    name: "",
    roofMeasurement: "",
    xmlType: "",
    existingShingle: "select",
    roofTotal: 0,
    ridge: 0,
    hip: 0,
    valley: 0,
    rake: 0,
    eave: 0,
    counterFlashing: 0,
    stepFlashing: 0,
    parapets: 0,
    existingRoof: false,
    roofType: "select",
   })

  const handleMeasurementChange = (e) => {
    setRoofTemplate({
      ...roofTemplate,
      roofMeasurement: e.target.value
    })
  }
  const handleXMLChange = (e) => {
    setRoofTemplate({
      ...roofTemplate,
      xmlType: e.target.value
    })
  }

  const handlePrev =  () => setRoofTemplate({
    ...roofTemplate,
    step: roofTemplate.step - 1
  })

  const handleNext =  () => {
    switch (roofTemplate.step) {
      default:
        setRoofTemplate({
        ...roofTemplate,
        step: roofTemplate.step + 1
    })
  }
}

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
              value={roofTemplate.job}
              onChange={(e) => setRoofTemplate({ ...roofTemplate, job: e.target.value })}
              />
              <label>Name</label>
              <input
              type="text"
              value={roofTemplate.name}
              onChange={(e) => setRoofTemplate({ ...roofTemplate, name: e.target.value })}
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
            style={{ width:"20px", height: "20px" }}
            type="radio"
            name="roofMeasurement"
            value="manual"
            checked={roofTemplate.roofMeasurement === 'manual'}
            onChange={handleMeasurementChange}
            />
            <label>.XML Upload</label>
            <input
            style={{ width:"20px", height: "20px" }}
            type="radio"
            name="roofMeasurement"
            value="xml"
            checked={roofTemplate.roofMeasurement === 'xml'}
            onChange={handleMeasurementChange}
            />
            <button onClick={() => handlePrev()}>Previous</button>
            <button onClick={() => handleNext()}>Next</button>
          </div>
          </>
        )
      case 3:

        if (roofTemplate.roofMeasurement === "manual"){
          return (
            <>
              <h1>Manual page</h1>
              <div className="form-group">
              <div className="form-group">
                <label>Total Roof Area</label>
                <input
                type="number"
                value={roofTemplate.roofTotal}
                onChange={(e) => setRoofTemplate({ ...roofTemplate, roofTotal: e.target.value })}

                />
              </div>
              <div className="form-group">
                <label>Ridge</label>
                <input
                type="number"
                value={roofTemplate.ridge}
                onChange={(e) => setRoofTemplate({ ...roofTemplate, ridge: e.target.value })}

                />
              </div>
              <div className="form-group">
                <label>Hip</label>
                <input
                type="number"
                value={roofTemplate.hip}
                onChange={(e) => setRoofTemplate({ ...roofTemplate, hip: e.target.value })}

                />
              </div>
              <div className="form-group">
                <label>Valley</label>
                <input
                type="number"
                value={roofTemplate.valley}
                onChange={(e) => setRoofTemplate({ ...roofTemplate, valley: e.target.value })}

                />
              </div>
              <div className="form-group">
                <label>Rake</label>
                <input
                type="number"
                value={roofTemplate.rake}
                onChange={(e) => setRoofTemplate({ ...roofTemplate, rake: e.target.value })}

                />
              </div>
              <div className="form-group">
                <label>Eave</label>
                <input
                type="number"
                value={roofTemplate.eave}
                onChange={(e) => setRoofTemplate({ ...roofTemplate, eave: e.target.value })}

                />
              </div>
              <div className="form-group">
                <label>Counter Flashing</label>
                <input
                type="number"
                value={roofTemplate.counterFlashing}
                onChange={(e) => setRoofTemplate({ ...roofTemplate, counterFlashing: e.target.value })}

                />
              </div>
              <div className="form-group">
                <label>Step Flashing</label>
                <input
                type="number"
                value={roofTemplate.stepFlashing}
                onChange={(e) => setRoofTemplate({ ...roofTemplate, stepFlashing: e.target.value })}

                />
              </div>
              <div className="form-group">
                <label>Parapets</label>
                <input
                type="number"
                value={roofTemplate.parapets}
                onChange={(e) => setRoofTemplate({ ...roofTemplate, parapets: e.target.value })}

                />
              </div>
              <div className="form-group">
                <label>Existing Roof?</label>
                <input
                style={{ width:"40px", height: "40px" }}
                type="checkbox"
                checked={roofTemplate.existingRoof === true }
                onChange={(e) => setRoofTemplate({ ...roofTemplate, existingRoof: !roofTemplate.existingRoof })}
                />
              </div>
              <div className="form-group">
                <label>Roof Type</label>
                <select
                name="roof_type"
                id="roof_type"
                size="1"
                onChange={(e) => setRoofTemplate({ ...roofTemplate, roofType: e.target.value })}>>
                  <option value="select">Select type</option>
                  <option value="gable">Gable</option>
                  <option value="hip">Hip</option>
                  <option value="mansard">Mansard</option>
                  <option value="dutch_hip">Dutch Hip</option>
                  <option value="gambrel">Gambrel</option>
                  <option value="flat">Flat</option>
                  <option value="shed">Shed</option>
                </select>
              </div>
              <div className="form-group">
                <label>Existing Shingle</label>
                <select
                name="existing_shingle"
                id="roof_type"
                size="1"
                onChange={(e) => setRoofTemplate({ ...roofTemplate, existingShingle: e.target.value })}>
                  <option value="select">Select shingle</option>
                  <option value="3-tab">3-Tab</option>
                  <option value="laminate">Laminate</option>
                </select>
              </div>
              <button onClick={() => console.log(roofTemplate)}>log</button>

              <button onClick={() => handlePrev()}>Previous</button>
              <button onClick={() => {
                console.log(roofTemplate)
                handleNext()
              }}>Next</button>
              </div>

            </>
          )
        }
        else if (roofTemplate.roofMeasurement === "xml") {
          return (
            <>
              <h1>.XML Upload</h1>
              <div className="form-group">
                <label>EagleView</label>
                <input
                style={{ width:"20px", height: "20px" }}
                type="radio"
                name="xmlType"
                value="eagle"
                checked={roofTemplate.xmlType === 'eagle'}
                onChange={handleXMLChange}
                />
                <label>Hover</label>
                <input
                style={{ width:"20px", height: "20px" }}
                type="radio"
                name="xmlType"
                value="hover"
                checked={roofTemplate.xmlType === 'hover'}
                onChange={handleXMLChange}
                />
                <label>Other</label>
                <input
                style={{ width:"20px", height: "20px" }}
                type="radio"
                name="xmlType"
                value="other"
                checked={roofTemplate.xmlType === 'other'}
                onChange={handleXMLChange}
                />
                <button onClick={() => handlePrev()}>Previous</button>
                <button onClick={() => handleNext()}>Next</button>
              </div>
            </>
          )
        }
        case 4:

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
