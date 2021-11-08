import React, { useState } from 'react';
// import { useLocation } from "react-router-dom";
import './UpgradeTool.css';

export default function UpgradeTool() {

  // const location = useLocation();
  // const paths = location.pathname.split("/");
  // let session_uuid = paths[2];
// console.log("location is," , location)

  const [roofTemplate, setRoofTemplate] = useState({
    step: "0",
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
    iceBool: false,
    dripEaves: false,
    apronEaves: false,
    valleyMetal: false,
    valleyMetalRolled: false,
    valleyMetalW: false,
    metalEdge: false,
    tab: "select",
    laminate: "select",
    synthetic: "select",
    pipeJacksNeo: false,
    pipeJacksOther: false,
    ridgeVent: false,
    underlayment: ""
   })

  const existingShingleUpgrade = () => {
    if (roofTemplate.existingShingle === "3-tab") {
      if (roofTemplate.tab === "20") {
        return (
          <div>
          25 year or 30 year 3 tab
          </div>
        )
      }
      else if (roofTemplate.tab === "25") {
        return (
          <div>
          30 year 3 tab
          </div>
        )
      }
    }
    else if (roofTemplate.existingShingle === "laminate") {
      switch (roofTemplate.laminate) {
        case "builder":
          return (
            <div>
              High Grade, Designer, Specialty
            </div>
          )
        case "high":
          return (
            <div>
              Designer, Specialty
            </div>
          )
        case "designer":
          return (
            <div>
              Specialty, Double Laminate, Triple Laminate
            </div>
          )
        default:
      }
    }
  }
  const existingMetalEdge = () => {
    if (roofTemplate.metalEdge) {
      if (!roofTemplate.dripEaves && !roofTemplate.apronEaves && !roofTemplate.dripRakes) {
        return (
          <>upgrade drip eaves, rakes and apron eaves</>
        )
      }
      if (!roofTemplate.dripEaves && !roofTemplate.apronEaves) {
        return (
          <div>upgrade drip eaves and apron eaves</div>
        )
      }
      if (!roofTemplate.dripEaves && !roofTemplate.dripRakes) {
        return (
          <div>upgrade drip eaves and drip rakes</div>
        )
      }
      if (!roofTemplate.apronEaves && !roofTemplate.dripRakes) {
        return (
          <div>upgrade apron eaves and drip rakes</div>
        )
      }
      if (!roofTemplate.dripEaves) {
        return (
          <div>Upgrade drip eaves</div>
        )
      }
      if (!roofTemplate.dripRakes) {
        return (
          <div>Upgrade drip rakes</div>
        )
      }
      if (!roofTemplate.apronEaves) {
        return (
          <div>Upgrade apron eaves</div>
        )
      }
    }
  }
  const existingValleyMetal = () => {
    if (roofTemplate.valleyMetal) {
      if (!roofTemplate.valleyMetalRolled || !roofTemplate.valleyMetalW) {
        return (
          <div>upgrade valley metal "W"</div>
        )
      }
    }
  }

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

  const zeroNext = () => {
    setRoofTemplate({
      ...roofTemplate, step: '1'
    })
  }
  const oneNext = () => {
    setRoofTemplate({
      ...roofTemplate, step: "manual"
    })
  }
  // xmlNext
  const manualNext = () => {
    setRoofTemplate({
      ...roofTemplate, step: "roofType"
    })
  }
  const roofTypeNext = () => {
    if (roofTemplate.roofType === "asphalt") {
      setRoofTemplate({
        ...roofTemplate,
        step: 'asphalt'
      })
    }
    else {
      setRoofTemplate({
        ...roofTemplate,
        step: 'underlayment'
      })
    }
  }
  const asphaltNext = () => {
    if (roofTemplate.existingShingle === "3-tab") {
    setRoofTemplate({
      ...roofTemplate,
      step: "3-tab"
    })
  }
  else {
    setRoofTemplate({
      ...roofTemplate,
      step: "laminate"
    })
    }
  }
  const threeNext = () => {
    setRoofTemplate({
      ...roofTemplate,
      step: "underlayment"
    })
  }
  const laminateNext = () => {
    setRoofTemplate({
      ...roofTemplate,
      step: "underlayment"
    })
  }
  const underlaymentNext = () => {
    if (roofTemplate.underlayment === "synthetic") {
    setRoofTemplate({
      ...roofTemplate,
      step: "synthetic"
    })
  } else {
    setRoofTemplate({
      ...roofTemplate,
      step: "ice-water-bool"
    })
    }
  }
  const syntheticNext = () => {
    setRoofTemplate({
      ...roofTemplate,
      step: "ice-water-bool"
    })
  }
  const iceWaterBoolNext = () => {
    if (roofTemplate.iceBool === true) {
      setRoofTemplate({
        ...roofTemplate,
        step: "ice-water"
      })
    } else {
      setRoofTemplate({
        ...roofTemplate,
        step: "metal"
      })
    }
  }
  const iceWaterNext = () => {
    setRoofTemplate({
      ...roofTemplate,
      step: "metal"
    })
  }
  const metalNext = () => {
    if (roofTemplate.metalEdge === true) {
      setRoofTemplate({
        ...roofTemplate,
        step: "drip-gutter"
      })
    } else {
      setRoofTemplate({
        ...roofTemplate,
        step: "bol-valley-metal"
      })
    }
  }
  const dripGutterNext = () => {
    setRoofTemplate({
      ...roofTemplate,
      step: "bol-valley-metal"
    })
  }
  const bolValleyMetalNext = () => {
    if (roofTemplate.valleyMetal === true) {
      setRoofTemplate({
        ...roofTemplate,
        step: "valley-metal"
      })
    } else {
      setRoofTemplate({
        ...roofTemplate,
        step: "pipejacks"
      })
    }
  }
  const valleyMetalNext = () => {
    if (roofTemplate.valleyMetalW === true) {
      setRoofTemplate({
        ...roofTemplate,
        step: "valley-metal-w"
      })
    } else {
      setRoofTemplate({
        ...roofTemplate,
        step: "pipejacks"
      })
    }
  }
  const valleyMetalWNext = () => {
    setRoofTemplate({
      ...roofTemplate,
      step: "pipejacks"
    })
  }
  const pipejacksNext = () => {
    if (roofTemplate.pipeJacksNeo === true) {
      setRoofTemplate({
        ...roofTemplate,
        step: "neoprene"
      })
    } else {
      setRoofTemplate({
        ...roofTemplate,
        step: "ridge-vent"
      })
    }
  }
  const neopreneNext = () => {
    setRoofTemplate({
      ...roofTemplate,
      step: "ridge-vent"
    })
  }
  const ridgeVentNext = () => {
    if (roofTemplate.ridgeVent === true) {
      setRoofTemplate({
        ...roofTemplate,
        step: "ridge"
      })
    } else {
      setRoofTemplate({
        ...roofTemplate,
        // TEMPORARY
        step: "upgrade-tool"
      })
    }
  }

  switch (roofTemplate.step) {
    default:
    case "0":
      return (
        <>
        <div className="question-container">
        <h1 className="question-header">Homeowner Information</h1>
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

        </div>
        <button className="survey-btn next" onClick={() => zeroNext()}>Next</button>
        </div>
        </>
      )
    case "1":

        return (
          <>
          <div className="question-container">
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
          </div>
          <button className="survey-btn" onClick={() => console.log("fix me")}>Previous</button>
          <button className="survey-btn next" onClick={() => oneNext()}>Next</button>
          </div>
          </>
        )
    case "manual":
        return (
          <>
          <div className="multi-container">

          <button className="survey-btn" onClick={() => console.log("fix me")}>Previous</button>

          <h1>Manual page</h1>
          <div className="tall-form-group">
          <div className="manual-form">
          <div className="hz-surv">
          <div className="manual-label">
          <label>Total Roof Area</label>
          <input
          type="number"
          value={roofTemplate.roofTotal}
          onChange={ (e) => setRoofTemplate({ ...roofTemplate, roofTotal: e.target.value }) }

          />
          </div>
          <div className="manual-label">

          <label>Ridge</label>
          <input
          type="number"
          value={roofTemplate.ridge}
          onChange={(e) => setRoofTemplate({ ...roofTemplate, ridge: e.target.value })}

          />
          </div>
          <div className="manual-label">
          <label>Hip</label>
          <input
          type="number"
          value={roofTemplate.hip}
          onChange={(e) => setRoofTemplate({ ...roofTemplate, hip: e.target.value })}

          />
          </div>
          </div>
          </div>
          <div className="manual-form">
          <div className="hz-surv">
          <div className="manual-label">
          <label>Valley</label>
          <input
          type="number"
          value={roofTemplate.valley}
          onChange={(e) => setRoofTemplate({ ...roofTemplate, valley: e.target.value })}

          />
          </div>
          </div>
          <div className="manual-form">
          <div className="manual-label">

          <label>Rake</label>
          <input
          type="number"
          value={roofTemplate.rake}
          onChange={(e) => setRoofTemplate({ ...roofTemplate, rake: e.target.value })}

          />
          </div>
          </div>
          <div className="manual-form">
          <label>Eave</label>
          <input
          type="number"
          value={roofTemplate.eave}
          onChange={(e) => setRoofTemplate({ ...roofTemplate, eave: e.target.value })}

          />
          </div>
          </div>
          <div className="manual-form">
          <label>Counter Flashing</label>
          <input
          type="number"
          value={roofTemplate.counterFlashing}
          onChange={(e) => setRoofTemplate({ ...roofTemplate, counterFlashing: e.target.value })}

          />
          </div>
          <div className="manual-form">
          <label>Step Flashing</label>
          <input
          type="number"
          value={roofTemplate.stepFlashing}
          onChange={(e) => setRoofTemplate({ ...roofTemplate, stepFlashing: e.target.value })}

          />
          </div>
          <div className="manual-form">
          <label>Parapets</label>
          <input
          type="number"
          value={roofTemplate.parapets}
          onChange={(e) => setRoofTemplate({ ...roofTemplate, parapets: e.target.value })}

          />
          </div>

          </div>

          <button className="survey-btn" onClick={() => console.log("fix me")}>Previous</button>
          <button className="survey-btn next" onClick={() => {
            setRoofTemplate({ ...roofTemplate, xmlType: "" })
            manualNext()
          }}>Next</button>
          </div>

          </>
        )
      case "xml":
        return (
          <>
          <div className="question-container">

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
            </div>
            <button className="survey-btn" onClick={() => console.log("fix me")}>Previous</button>
            <button className="survey-btn next" onClick={() => console.log("fix me")}>Next</button>
            </div>

          </>
        )

    case "roofType":
          return (
            <>
            <div className="roof-type">
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
            <button className="survey-btn" onClick={() => console.log("fix me")}>Previous</button>
            <button className="survey-btn next" onClick={() => roofTypeNext()}>Next</button>
            </>
          )

    case "asphalt":
            return (
              <>
              <div className="question-container">
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
              </div>
              <button className="survey-btn" onClick={() => console.log("fix me")}>Previous</button>
              <button className="survey-btn next" onClick={() => asphaltNext()}>Next</button>
              </div>
              </>
            )
          // if user went down different path we need to reset that state here
      case "metal":
          return (
            <>
            <div className="question-container">
            <div className="form-group">
              <label>Metal Edge</label>
              <input
              style={{ width:"40px", height: "40px" }}
              type="checkbox"
              checked={roofTemplate.metalEdge === true }
              onChange={(e) => setRoofTemplate({ ...roofTemplate, metalEdge: !roofTemplate.metalEdge })}
              />
            </div>
              <button className="survey-btn" onClick={() => console.log("fix me")}>Previous</button>
              <button className="survey-btn next" onClick={() => metalNext()}>Next</button>
              </div>

            </>
          )
    case "3-tab":
          return (
            <>
            <div className="question-container">

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
            </div>
            <button className="survey-btn" onClick={() => console.log("fix me")}>Previous</button>
            <button className="survey-btn next" onClick={() => threeNext()}>Next</button>
            </div>

            </>
          )
          case "laminate":
          return (
            <>
            <div className="question-container">

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
            </div>
            <button className="survey-btn" onClick={() => console.log("fix me")}>Previous</button>
            <button className="survey-btn next" onClick={() => laminateNext()}>Next</button>
            </div>

            </>
          )
    case "bol-valley-metal":
        return (
          <>
          <div className="question-container">

          <h2>Valley Metal</h2>
          <div className="form-group">
          <input
          style={{ width:"40px", height: "40px" }}
          type="checkbox"
          checked={roofTemplate.valleyMetal === true }
          onChange={(e) => setRoofTemplate({ ...roofTemplate, valleyMetal: !roofTemplate.valleyMetal })}
          />
          </div>
          <button className="survey-btn" onClick={ () => console.log("fix me")}>Previous</button>
          <button className="survey-btn next" onClick={() => bolValleyMetalNext()}>Next</button>
          </div>

          </>
        )
    case "underlayment":
        return (
          <>
          <div className="question-container">

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

            </div>
            <button className="survey-btn" onClick={() => console.log("fix me")}>Previous</button>
            <button className="survey-btn next" onClick={() => underlaymentNext()}>Next</button>
            </div>

          </>
        )
    case "valley-metal":
          return (
            <>
            <div className="question-container">

            <h2>Valley Metal</h2>
            <div className="form-group">
            <label>Rolled</label>
            <input
            style={{ width:"40px", height: "40px" }}
            type="checkbox"
            checked={roofTemplate.valleyMetalRolled === true }
            onChange={(e) => setRoofTemplate({ ...roofTemplate, valleyMetalRolled: !roofTemplate.valleyMetalRolled })}
            />
            <label>"W"</label>
            <input
            style={{ width:"40px", height: "40px" }}
            type="checkbox"
            checked={roofTemplate.valleyMetalW === true }
            onChange={(e) => setRoofTemplate({ ...roofTemplate, valleyMetalW: !roofTemplate.valleyMetalW })}
            />
            </div>
            <button className="survey-btn" onClick={ () => console.log("fix me")}>Previous</button>
            <button className="survey-btn next" onClick={() => valleyMetalNext()}>Next</button>
            </div>

            </>
          )
    case "valley-metal-w":
          return (
            <>
            <div className="question-container">

            <h2>Valley Metal "W"</h2>
            <div className="form-group">
            <label>Painter</label>
            <input
            style={{ width:"40px", height: "40px" }}
            type="checkbox"
            checked={roofTemplate.wPainter === true }
            onChange={(e) => setRoofTemplate({ ...roofTemplate, wPainter: !roofTemplate.wPainter })}
            />
            <label>Copper</label>
            <input
            style={{ width:"40px", height: "40px" }}
            type="checkbox"
            checked={roofTemplate.wCopper === true }
            onChange={(e) => setRoofTemplate({ ...roofTemplate, wCopper: !roofTemplate.wCopper })}
            />
            </div>
            <button className="survey-btn" onClick={ () => console.log("fix me")}>Previous</button>
            <button className="survey-btn next" onClick={() => valleyMetalWNext()}>Next</button>
            </div>

            </>
          )
    case "ice-water-bool":
          return (
            <>
            <div className="question-container">

            <div className="form-group">
              <label>Ice and Water Barrier</label>
              <input
              style={{ width:"40px", height: "40px" }}
              type="checkbox"
              checked={roofTemplate.iceBool=== true }
              onChange={(e) => setRoofTemplate({ ...roofTemplate, iceBool: !roofTemplate.iceBool })}
              />

            </div>
            <button className="survey-btn" onClick={() => console.log("fix me")}>Previous</button>
            <button className="survey-btn next" onClick={() => iceWaterBoolNext()}>Next</button>
            </div>

            </>
          )
    case "synthetic":
          // if user went down different path we need to reset that state here
          return (
            <>
            <div className="question-container">

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


              </div>
              <button className="survey-btn" onClick={() => console.log("fix me")}>Previous</button>
              <button className="survey-btn next" onClick={() => syntheticNext()}>Next</button>
              </div>

            </>
          )
    case "pipejacks":
        return (
        <>
        <div className="question-container">

        <div className="form-group">
        <label>Neoprene/Hard Plastics</label>
        <input
        style={{ width:"40px", height: "40px" }}
        type="checkbox"
        checked={roofTemplate.pipeJacksNeo === true }
        onChange={(e) => setRoofTemplate({ ...roofTemplate, pipeJacksNeo: !roofTemplate.pipeJacksNeo })}
        />
        <label>Other</label>
        <input
        style={{ width:"40px", height: "40px" }}
        type="checkbox"
        checked={roofTemplate.pipeJacksOther === true }
        onChange={(e) => setRoofTemplate({ ...roofTemplate, pipeJacksOther: !roofTemplate.pipeJacksOther })}
        />
        </div>
        <button className="survey-btn" onClick={() => console.log("fix me")}>Previous</button>
        <button className="survey-btn next" onClick={() => pipejacksNext()}>Next</button>
        </div>

        </>
      )

    case "neoprene":
          return (
            <>
            <div className="question-container">

              <div className="form-group">
              <h1>Neoprene/Hard Plastic</h1>
              <input
              style={{ width:"40px", height: "40px" }}
              type="checkbox"
              checked={roofTemplate.neoprene1 === true }
              onChange={(e) => setRoofTemplate({ ...roofTemplate, neoprene1: !roofTemplate.neoprene1 })}
              />
              <label>1"</label>
              <input
              style={{ width:"40px", height: "40px" }}
              type="checkbox"
              checked={roofTemplate.neoprene15 === true }
              onChange={(e) => setRoofTemplate({ ...roofTemplate, neoprene15: !roofTemplate.neoprene15 })}
              />
              <label>1 1/2"</label>
              <input
              style={{ width:"40px", height: "40px" }}
              type="checkbox"
              checked={roofTemplate.neoprene2 === true }
              onChange={(e) => setRoofTemplate({ ...roofTemplate, neoprene2: !roofTemplate.neoprene2 })}
              />
              <label>2"</label>
              <input
              style={{ width:"40px", height: "40px" }}
              type="checkbox"
              checked={roofTemplate.neoprene25 === true }
              onChange={(e) => setRoofTemplate({ ...roofTemplate, neoprene25: !roofTemplate.neoprene25 })}
              />
              <label>2 1/2"</label>
              <input
              style={{ width:"40px", height: "40px" }}
              type="checkbox"
              checked={roofTemplate.neoprene3 === true }
              onChange={(e) => setRoofTemplate({ ...roofTemplate, neoprene3: !roofTemplate.neoprene3 })}
              />
              <label>3"</label>
              <input
              style={{ width:"40px", height: "40px" }}
              type="checkbox"
              checked={roofTemplate.neoprene4 === true }
              onChange={(e) => setRoofTemplate({ ...roofTemplate, neoprene4: !roofTemplate.neoprene4 })}
              />
              <label>4"</label>
              <input
              style={{ width:"40px", height: "40px" }}
              type="checkbox"
              checked={roofTemplate.neoprene6 === true }
              onChange={(e) => setRoofTemplate({ ...roofTemplate, neoprene6: !roofTemplate.neoprene6 })}
              />
              <label>6"</label>
              </div>
              <button className="survey-btn" onClick={() => console.log("fix me")}>Previous</button>
              <button className="survey-btn next" onClick={() => neopreneNext()}>Next</button>
              </div>

            </>
          )
      case "ice-water":
          return (
            <>
            <div className="question-container">

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

            </div>
            <button className="survey-btn" onClick={() => console.log("fix me")}>Previous</button>
            <button className="survey-btn next" onClick={() => iceWaterNext()}>Next</button>
            </div>

            </>
          )
      case "ridge-vent":
          return (
          <>
          <div className="question-container">

          <h2>Ventilation</h2>
          <div className="form-group">
            <label>Ridge Vent</label>
            <input
            style={{ width:"40px", height: "40px" }}
            type="checkbox"
            checked={roofTemplate.ridgeVent === true }
            onChange={(e) => setRoofTemplate({ ...roofTemplate, ridgeVent: !roofTemplate.ridgeVent })}
            />
          </div>
          <button className="survey-btn" onClick={() => console.log("fix me")}>Previous</button>
          <button className="survey-btn next" onClick={() => ridgeVentNext()}>Next</button>
          </div>

          </>
          )
      case "drip-gutter":
          return (
            <>
            <div className="question-container">
            <h2>Drip</h2>
            <div className="form-group">
              <label>Rakes</label>
              <input
              style={{ width:"40px", height: "40px" }}
              type="checkbox"
              checked={roofTemplate.dripRakes === true }
              onChange={(e) => setRoofTemplate({ ...roofTemplate, dripRakes: !roofTemplate.dripRakes })}
              />
              <label>Eaves</label>
              <input
              style={{ width:"40px", height: "40px" }}
              type="checkbox"
              checked={roofTemplate.dripEaves === true }
              onChange={(e) => setRoofTemplate({ ...roofTemplate, dripEaves: !roofTemplate.dripEaves })}
              />
            </div>
            <h2>Gutter Apron</h2>
            <div className="form-group">
              <label>Eaves</label>
              <input
              style={{ width:"40px", height: "40px" }}
              type="checkbox"
              checked={roofTemplate.apronEaves === true }
              onChange={(e) => setRoofTemplate({ ...roofTemplate, apronEaves: !roofTemplate.apronEaves })}
              />

            </div>
              <button className="survey-btn" onClick={() => console.log("fix me")}>Previous</button>
              <button className="survey-btn next" onClick={() => dripGutterNext()}>Next</button>
              </div>

            </>
          )

    case "ridge":
          return (
            <>
            <div className="question-container">

              <h1>Ridge Cap</h1>
              <div className="form-group">
                <label>3-Tab</label>
                <input
                style={{ width:"40px", height: "40px" }}
                type="checkbox"
                checked={roofTemplate.tab === true }
                onChange={(e) => setRoofTemplate({ ...roofTemplate, tab: !roofTemplate.tab })}
                />
                <label>Standard Profile</label>
                <input
                style={{ width:"40px", height: "40px" }}
                type="checkbox"
                checked={roofTemplate.standard === true }
                onChange={(e) => setRoofTemplate({ ...roofTemplate, standard: !roofTemplate.standard })}
                />
                <label>High Profile</label>
                <input
                style={{ width:"40px", height: "40px" }}
                type="checkbox"
                checked={roofTemplate.highProf === true }
                onChange={(e) => setRoofTemplate({ ...roofTemplate, highProf: !roofTemplate.highProf })}
                />

              </div>
              <button className="survey-btn" onClick={() => console.log("fix me")}>Previous</button>
              <button className="survey-btn next" onClick={() => console.log("fix me")}>Next</button>
              </div>

            </>
          )
        case "upgrade-tool":
          return   (
            <>
            <div className="question-container">
            <button onClick={() => console.log(roofTemplate)}>log</button>
            <h1>Available Upgrades</h1>
            {existingShingleUpgrade()}
            {existingMetalEdge()}
            {existingValleyMetal()}
            <button className="survey-btn" onClick={() => console.log("fix me")}>Previous</button>
            <button className="survey-btn next" onClick={() => console.log("fix me")}>Next</button>
            </div>

            </>
          )
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
