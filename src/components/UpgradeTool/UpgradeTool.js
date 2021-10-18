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
    roofTotal: undefined,
    ridge: undefined,
    hip: undefined,
    valley: undefined,
    rake: undefined,
    eave: undefined,
    counterFlashing: undefined,
    stepFlashing: undefined,
    parapets: undefined,
    existingRoof: false,
    roofType: "select",
    dripRakes: false,
    tab: "select",
    laminate: "select",
    synthetic: "select",
    underlayment: ""
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
  const handleUnderlaymentChange = (e) => {
    setRoofTemplate({
      ...roofTemplate,
      underlayment: e.target.value
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
        if (roofTemplate.roofMeasurement === "") {
          return setRoofTemplate({ ...roofTemplate, step: 2 })
        }
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
                <label>Roof Type</label>
                <select
                name="roof_type"
                id="roof_type"
                size="1"
                value={roofTemplate.roofType}
                onChange={(e) => setRoofTemplate({ ...roofTemplate, roofType: e.target.value })}>>
                  <option value="select">Select type</option>
                  <option value="asphalt">Asphalt</option>
                  <option value="copper">Copper</option>
                  <option value="metal">Metal</option>
                  <option value="synthetic">Synthetic</option>
                  <option value="tile">Tile</option>
                  <option value="wood">Wood</option>
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
        break
        case 4:
          if (roofTemplate.roofType === "select") {
            return setRoofTemplate({ ...roofTemplate, step: 3 })
          }
          if (roofTemplate.roofType === "asphalt") {
            // if user went down different path we need to reset that state here
            return (
              <>
              <div className="form-group">
                  <label>Existing Shingle</label>
                  <select
                  name="existing_shingle"
                  id="roof_type"
                  size="1"
                  value={roofTemplate.existingShingle}
                  onChange={(e) => setRoofTemplate({ ...roofTemplate, existingShingle: e.target.value })}>
                  <option value="select">Select shingle</option>
                  <option value="3-tab">3-Tab</option>
                  <option value="laminate">Laminate</option>
                  </select>
                  <button onClick={() => handlePrev()}>Previous</button>
                  <button onClick={() => handleNext()}>Next</button>
              </div>
              </>
            )
          }
        else if (roofTemplate.roofType === "metal") {
          // if user went down different path we need to reset that state here
          return (
            <>
              <h2>Drip</h2>
              <div className="form-group">
                <label>Rakes</label>
                <input
                style={{ width:"40px", height: "40px" }}
                type="checkbox"
                checked={roofTemplate.dripRakes === true }
                onChange={(e) => setRoofTemplate({ ...roofTemplate, dripRakes: !roofTemplate.dripRakes })}
                />
                <button onClick={() => handlePrev()}>Previous</button>
                <button onClick={() => handleNext()}>Next</button>

              </div>
              <h2>Gutter Apron</h2>
            </>
          )
        }
        else {
          return setRoofTemplate({ ...roofTemplate, step: 6 })
        }
      case 5:
      if (roofTemplate.existingShingle === "select") {
        return setRoofTemplate({ ...roofTemplate, step: 4 })
      }
        if (roofTemplate.existingShingle === "3-tab") {
          return (
            <>
            <div className="form-group">
                <label>3-Tab</label>
                <select
                name="3_tab"
                id="roof_type"
                size="1"
                value={roofTemplate.tab}
                onChange={(e) => setRoofTemplate({ ...roofTemplate, tab: e.target.value })}>
                <option value="select">Select shingle</option>
                <option value="20">20 Year</option>
                <option value="25">25 Year</option>
                <option value="30">30 Year</option>
                </select>
                <button onClick={() => handlePrev()}>Previous</button>
                <button onClick={() => handleNext()}>Next</button>
            </div>
            </>
          )
        }
      else if (roofTemplate.existingShingle === "laminate") {
          return (
            <>
            <div className="form-group">
                <label>Laminate</label>
                <select
                name="laminate"
                id="roof_type"
                size="1"
                value={roofTemplate.laminate}
                onChange={(e) => setRoofTemplate({ ...roofTemplate, laminate: e.target.value })}>
                <option value="select">Select laminate</option>
                <option value="builder">Builder Grade</option>
                <option value="high">High Grade</option>
                <option value="designer">Designer</option>
                <option value="specialty">Specialty</option>
                </select>
                <button onClick={() => handlePrev()}>Previous</button>
                <button onClick={() => handleNext()}>Next</button>
            </div>
            </>
          )
        }
        break
      case 6:
        return (
          <>
            <h1>Underlayment</h1>
            <div className="form-group">
              <label>Felt</label>
              <input
              style={{ width:"20px", height: "20px" }}
              type="radio"
              name="underlayment"
              value="felt"
              checked={roofTemplate.underlayment === 'felt'}
              onChange={handleUnderlaymentChange}
              />
              <label>Synthetic</label>
              <input
              style={{ width:"20px", height: "20px" }}
              type="radio"
              name="underlayment"
              value="synthetic"
              checked={roofTemplate.underlayment === 'synthetic'}
              onChange={handleUnderlaymentChange}
              />
              <button onClick={() => handlePrev()}>Previous</button>
              <button onClick={() => handleNext()}>Next</button>
              <button onClick={() => console.log(roofTemplate)}>log</button>

            </div>
          </>
        )
      case 7:
        if (roofTemplate.underlayment === 'felt') {
          return (
            <div className="form-group">
              <label>Ice and Water Barrier</label>
              <input
              style={{ width:"40px", height: "40px" }}
              type="checkbox"
              checked={roofTemplate.iceBool=== true }
              onChange={(e) => setRoofTemplate({ ...roofTemplate, iceBool: !roofTemplate.iceBool })}
              />
              <button onClick={() => handlePrev()}>Previous</button>
              <button onClick={() => handleNext()}>Next</button>

            </div>

          )
        }
        else if (roofTemplate.underlayment === "synthetic") {
          // if user went down different path we need to reset that state here
          return (
            <>
              <div className="form-group">
                <label>Synthetic</label>
                <select
                name="existing_roof"
                id="roof_type"
                size="1"
                value={roofTemplate.synthetic}
                onChange={(e) => setRoofTemplate({ ...roofTemplate, synthetic: e.target.value })}>
                  <option value="select">Select shingle</option>
                  <option value="builder">Builder Grade</option>
                  <option value="better">Better Grade</option>
                  <option value="best">Best Grade</option>
                </select>

                <button onClick={() => handlePrev()}>Previous</button>
                <button onClick={() => handleNext()}>Next</button>

              </div>
            </>
          )
        }
      break
      case 8:
        if (roofTemplate.iceBool) {
          return (
            <>
            <h2>Ice and Water Barrier</h2>

            <div className="form-group">
              <label>Eaves</label>
              <input
              style={{ width:"40px", height: "40px" }}
              type="checkbox"
              checked={roofTemplate.iceEaves === true }
              onChange={(e) => setRoofTemplate({ ...roofTemplate, iceEaves: !roofTemplate.iceEaves })}
              />
              <label>Rakes</label>
              <input
              style={{ width:"40px", height: "40px" }}
              type="checkbox"
              checked={roofTemplate.iceRakes === true }
              onChange={(e) => setRoofTemplate({ ...roofTemplate, iceRakes: !roofTemplate.iceRakes })}
              />
              <label>Valleys</label>
              <input
              style={{ width:"40px", height: "40px" }}
              type="checkbox"
              checked={roofTemplate.iceValleys === true }
              onChange={(e) => setRoofTemplate({ ...roofTemplate, iceValleys: !roofTemplate.iceValleys })}
              />
              <label>Low Scope</label>
              <input
              style={{ width:"40px", height: "40px" }}
              type="checkbox"
              checked={roofTemplate.iceLow === true }
              onChange={(e) => setRoofTemplate({ ...roofTemplate, iceLow: !roofTemplate.iceLow })}
              />
              <label>Entire Roof</label>
              <input
              style={{ width:"40px", height: "40px" }}
              type="checkbox"
              checked={roofTemplate.iceEntire === true }
              onChange={(e) => setRoofTemplate({ ...roofTemplate, iceEntire: !roofTemplate.iceEntire })}
              />
              <button onClick={() => handlePrev()}>Previous</button>
              <button onClick={() => handleNext()}>Next</button>

            </div>
            </>
          )
        }
        else {
          return (
            <>
              <h2>Metal Edge</h2>
              <div className="form-group">
                <label>Metal Edge</label>
                <input
                style={{ width:"40px", height: "40px" }}
                type="checkbox"
                checked={roofTemplate.metalEdge === true }
                onChange={(e) => setRoofTemplate({ ...roofTemplate, metalEdge: !roofTemplate.metalEdge })}
                />
                <button onClick={() => handlePrev()}>Previous</button>
                <button onClick={() => handleNext()}>Next</button>

              </div>

            </>
          )
        }
      case 9:
        if (roofTemplate.metalEdge) {

        }
  }
}
// checked
// <div className="form-group">
//   <label>Existing Roof?</label>
//   <input
//   style={{ width:"40px", height: "40px" }}
//   type="checkbox"
//   checked={roofTemplate.existingRoof === true }
//   onChange={(e) => setRoofTemplate({ ...roofTemplate, existingRoof: !roofTemplate.existingRoof })}
//   />
// </div>
