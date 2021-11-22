import React, { useState } from 'react';
import StepZero from './StepZero.js';
import StepOne from './StepOne.js';
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
    wGalvanized: false,
    wPainter: false,
    wCopper: false,
    metalEdge: false,
    tab: "select",
    laminate: "select",
    synthetic: "select",
    pipeJacksNeo: false,
    pipeJacksOther: false,
    ridgeVent: false,
    underlayment: "",
    stepAluminum: false,
    stepCopper: false,
    stepGalvanized: false,
    counterAluminum: false,
    counterCopper: false,
    counterPainted: false,
    chimneyAluminum: false,
    chimneyCopper: false,
    chimneyLead: false,
    chimneyPainted: false,
   })
  const [upgradeOptions, setUpgradeOptions] = useState({
      twentyTab: false,
      builderLam: false,
      highLam: false,
      designerLam: false,
      specialtyLam: false,
      doubleLam: false,
      tripleLam: false,
      felt: false,
      builderSynth: false,
      betterSynth: false
  })
  const [choosenUpgrades, setChoosenUpgrades] = useState({
    twentyFiveTab: false,

    builderLam: false,
    highLam: false,
    designerLam: false,
    specialtyLam: false,
    doubleLam: false,
    tripleLam: false,

    fifteenFelt: false,
    thirtyFelt: false,

    builderSynth: false,
    betterSynth: false,
    bestSynth: false,

    dripRakes: false,
    dripEaves: false,
    gutterEaves: false,

    valleyMetalW: false,
    valleyMetalPainted: false,
    valleyMetalGalvanized: false,
    valleyMetalCopper: false,

    threeRidge: false,
    standardRidge: false,
    highRidge: false,

    sFAlum: false,
    sFCopper: false,
    sFGalvan: false,

    cFAlum: false,
    cFCopper: false,
    cFGalvan: false,

    chFAlum: false,
    chFCopper: false,
    chFGalvan: false,
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
  const onePrev = () => setRoofTemplate({ ...roofTemplate, step: '0'})
  // xmlNext
  const manualNext = () => {
    setRoofTemplate({
      ...roofTemplate, step: "roofType"
    })
  }
  const manualPrev = () => setRoofTemplate({ ...roofTemplate, step: '1'})
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
  const roofTypePrev = () => {
    setRoofTemplate({
      ...roofTemplate,
      step: "manual"
    })
  }
  const asphaltNext = () => {
    if (roofTemplate.existingShingle === "3-tab") {
      setRoofTemplate({
        ...roofTemplate,
        step: "3-tab"
      })
  } else {
    setRoofTemplate({
      ...roofTemplate,
      step: "laminate"
    })
  }

  }
  const asphaltPrev = () => {
    setRoofTemplate({
      ...roofTemplate,
      step: "roofType"
    })
  }
  const threeNext = () => {
    if (roofTemplate.tab === "20") {
      setUpgradeOptions({
        ...upgradeOptions,
        twentyTab: true
      })
    }
      setRoofTemplate({
        ...roofTemplate,
        step: "underlayment",
      })
  }
  const threePrev = () => {
    setRoofTemplate({
      ...roofTemplate,
      step: "asphalt"
    })
  }
  const laminateNext = () => {
    if (roofTemplate.laminate === "builder") {
      setUpgradeOptions({
        ...upgradeOptions,
        builderLam: true
      })
    }
    else if (roofTemplate.laminate === "high") {
      setUpgradeOptions({
        ...upgradeOptions,
        highLam: true
      })
    }
    else if (roofTemplate.laminate === "designer") {
      setUpgradeOptions({
        ...upgradeOptions,
        designerLam: true
      })
    }
    else if (roofTemplate.laminate === "specialty") {
      setUpgradeOptions({
        ...upgradeOptions,
        specialtyLam: true
      })
    }
    setRoofTemplate({
      ...roofTemplate,
      step: "underlayment"
    })
  }
  const laminatePrev = () => {
    setRoofTemplate({
      ...roofTemplate,
      step: "asphalt"
    })
  }
  const underlaymentNext = () => {
    if (roofTemplate.underlayment === "synthetic") {
    setRoofTemplate({
      ...roofTemplate,
      step: "synthetic"
    })
  } else {
    setUpgradeOptions({
      ...upgradeOptions,
      felt: true
    })
    setRoofTemplate({
      ...roofTemplate,
      step: "ice-water-bool"
    })
    }
  }
  const underlaymentPrev = () => {
    if (roofTemplate.roofType !== "asphalt") {
      setRoofTemplate({
        ...roofTemplate,
        step: "roofType"
      })
    } else if (roofTemplate.existingShingle === "3-tab") {
      setRoofTemplate({
        ...roofTemplate,
        step: "3-tab"
      })
    } else {
      setRoofTemplate({
        ...roofTemplate,
        step: "laminate"
      })
    }
  }
  const syntheticNext = () => {
    if (roofTemplate.synthetic === "builder") {
      setUpgradeOptions({
        ...upgradeOptions,
        builderSynth: true
      })
    }
    else if (roofTemplate.synthetic === "better") {
      setUpgradeOptions({
        ...upgradeOptions,
        betterSynth: true
      })
    }
    setRoofTemplate({
      ...roofTemplate,
      step: "ice-water-bool"
    })
  }
  const syntheticPrev = () => {
    setRoofTemplate({
      ...roofTemplate,
      step: "underlayment"
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
  const iceWaterBoolPrev = () => {
    if (roofTemplate.underlayment==="synthetic") {
      setRoofTemplate({
        ...roofTemplate,
        step: "synthetic"
      })
    } else {
      setRoofTemplate({
        ...roofTemplate,
        step: "underlayment"
      })
    }
  }
  const iceWaterNext = () => {
    setRoofTemplate({
      ...roofTemplate,
      step: "metal"
    })
  }
  const iceWaterPrev = () => {
    setRoofTemplate({
      ...roofTemplate,
      step: "ice-water-bool"
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
  const metalPrev = () => {
    if (!roofTemplate.iceBool) {
      setRoofTemplate({
        ...roofTemplate,
        step: "ice-water-bool"
      })
    } else {
      setRoofTemplate({
        ...roofTemplate,
        step: "ice-water"
      })
    }
  }
  const dripGutterNext = () => {
    setRoofTemplate({
      ...roofTemplate,
      step: "bol-valley-metal"
    })
  }
  const dripGutterPrev = () => {
    setRoofTemplate({
      ...roofTemplate,
      step: "metal"
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
  const bolValleyMetalPrev = () => {
    if (!roofTemplate.metalEdge) {
      setRoofTemplate({
        ...roofTemplate,
        step: "metal"
      })
    } else {
      setRoofTemplate({
        ...roofTemplate,
        step: "drip-gutter"
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
  const valleyMetalPrev = () => {
    setRoofTemplate({
      ...roofTemplate,
      step: "bol-valley-metal"
    })
  }
  const valleyMetalWNext = () => {
    setRoofTemplate({
      ...roofTemplate,
      step: "pipejacks"
    })
  }
  const valleyMetalWPrev = () => {
    setRoofTemplate({
      ...roofTemplate,
      step: "valley-metal"
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
  const pipejacksPrev = () => {
    if (!roofTemplate.valleyMetal) {
      setRoofTemplate({
        ...roofTemplate,
        step: "bol-valley-metal"
      })
    } else if (roofTemplate.valleyMetalW) {
      setRoofTemplate({
        ...roofTemplate,
        step: "valley-metal-w"
      })
    } else {
      setRoofTemplate({
        ...roofTemplate,
        step: "valley-metal"
      })
    }
  }
  const neopreneNext = () => {
    setRoofTemplate({
      ...roofTemplate,
      step: "ridge-vent"
    })
  }
  const neoprenePrev = () => {
    setRoofTemplate({
      ...roofTemplate,
      step: 'pipejacks'
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
        step: "step-flashing"
      })
    }
  }
  const ridgeVentPrev = () => {
    if (roofTemplate.pipeJacksNeo) {
      setRoofTemplate({
        ...roofTemplate,
        step: 'neoprene'
      })
    } else {
      setRoofTemplate({
        ...roofTemplate,
        step: 'pipejacks'
      })
    }
  }
  const ridgeNext = () => {
    setRoofTemplate({
      ...roofTemplate,
      step: 'step-flashing'
    })
  }
  const ridgePrev = () => {
    setRoofTemplate({
      ...roofTemplate,
      step: 'ridge-vent'
    })
  }
  const stepFlashingNext = () => {
    setRoofTemplate({
      ...roofTemplate,
      step: 'counter-flashing'
    })
  }
  const stepFlashingPrev = () => {
    if (roofTemplate.ridgeVent) {
      setRoofTemplate({ ...roofTemplate, step: 'ridge'})
    } else {
     setRoofTemplate({...roofTemplate, step:'ridge-vent'})
   }
 }
  const counterFlashingNext = () => {
    setRoofTemplate({
      ...roofTemplate,
      step: 'chimney-flashing'
    })
  }
  const counterFlashingPrev = () => setRoofTemplate({ ...roofTemplate, step: 'step-flashing'})
  const chimneyFlashingNext = () => {
    setRoofTemplate({
      ...roofTemplate,
      step: 'upgrade-tool'
    })
  }
  const chimneyFlashingPrev = () => setRoofTemplate({ ...roofTemplate, step: 'counter-flashing'})
  const upgradeToolPrev = () => setRoofTemplate({ ...roofTemplate, step: 'chimney-flashing'})

// upgrade conditionals
  const existingShingleUpgrade = () => {
    if (roofTemplate.existingShingle === "3-tab") {
      if (roofTemplate.tab === "20") {
        return (
          <ul>
            <h4>Existing Shingle Upgrades</h4>
            <li className="upgrade-li" >25 year
            <input
            type="checkbox"
            checked={choosenUpgrades.twentyFiveTab === true }
            onChange={(e) => setChoosenUpgrades({ ...choosenUpgrades, twentyFiveTab: !choosenUpgrades.twentyFiveTab })}/>
            </li>
          </ul>
        )
      }
      else if (roofTemplate.tab === "25") {
        return (
          <>
          </>
        )
      }
    }
    else if (roofTemplate.existingShingle === "laminate") {
      switch (roofTemplate.laminate) {
        case "builder":
          return (
            <ul>
            <h4>Laminate Upgrades</h4>
              <li className="upgrade-li" >High Grade Laminate<input
              type="checkbox"
              checked={choosenUpgrades.highLam === true }
              onChange={(e) => setChoosenUpgrades({ ...choosenUpgrades, highLam: !choosenUpgrades.highLam })}/>
              </li>

              <li className="upgrade-li" >Designer Grade Laminate<input
              type="checkbox"
              checked={choosenUpgrades.designerLam === true }
              onChange={(e) => setChoosenUpgrades({ ...choosenUpgrades, designerLam: !choosenUpgrades.designerLam })}/>
              </li>

              <li className="upgrade-li" >Specialty Grade Laminate<input
              type="checkbox"
              checked={choosenUpgrades.specialtyLam === true }
              onChange={(e) => setChoosenUpgrades({ ...choosenUpgrades, specialtyLam: !choosenUpgrades.specialtyLam })}/>
              </li>

              <li className="upgrade-li" >Double Laminate<input
              type="checkbox"
              checked={choosenUpgrades.doubleLam === true }
              onChange={(e) => setChoosenUpgrades({ ...choosenUpgrades, doubleLam: !choosenUpgrades.doubleLam })}/>
              </li>

              <li className="upgrade-li" >Triple Laminate<input
              type="checkbox"
              checked={choosenUpgrades.tripleLam === true }
              onChange={(e) => setChoosenUpgrades({ ...choosenUpgrades, tripleLam: !choosenUpgrades.tripleLam })}/>
              </li>
            </ul>
          )
        case "high":
          return (
            <ul>
            <h4>Laminate Upgrades</h4>
            <li className="upgrade-li" >Designer Grade Laminate<input
            type="checkbox"
            checked={choosenUpgrades.designerLam === true }
            onChange={(e) => setChoosenUpgrades({ ...choosenUpgrades, designerLam: !choosenUpgrades.designerLam })}/>
            </li>

            <li className="upgrade-li" >Specialty Grade Laminate<input
            type="checkbox"
            checked={choosenUpgrades.specialtyLam === true }
            onChange={(e) => setChoosenUpgrades({ ...choosenUpgrades, specialtyLam: !choosenUpgrades.specialtyLam })}/>
            </li>

            <li className="upgrade-li" >Double Laminate<input
            type="checkbox"
            checked={choosenUpgrades.doubleLam === true }
            onChange={(e) => setChoosenUpgrades({ ...choosenUpgrades, doubleLam: !choosenUpgrades.doubleLam })}/>
            </li>

            <li className="upgrade-li" >Triple Laminate<input
            type="checkbox"
            checked={choosenUpgrades.tripleLam === true }
            onChange={(e) => setChoosenUpgrades({ ...choosenUpgrades, tripleLam: !choosenUpgrades.tripleLam })}/>
            </li>
            </ul>
          )
        case "designer":
          return (
            <ul>
            <h4>Laminate Upgrades</h4>
            <li className="upgrade-li" >Specialty Grade Laminate<input
            type="checkbox"
            checked={choosenUpgrades.specialtyLam === true }
            onChange={(e) => setChoosenUpgrades({ ...choosenUpgrades, specialtyLam: !choosenUpgrades.specialtyLam })}/>
            </li>

            <li className="upgrade-li" >Double Laminate<input
            type="checkbox"
            checked={choosenUpgrades.doubleLam === true }
            onChange={(e) => setChoosenUpgrades({ ...choosenUpgrades, doubleLam: !choosenUpgrades.doubleLam })}/>
            </li>

            <li className="upgrade-li" >Triple Laminate<input
            type="checkbox"
            checked={choosenUpgrades.tripleLam === true }
            onChange={(e) => setChoosenUpgrades({ ...choosenUpgrades, tripleLam: !choosenUpgrades.tripleLam })}/>
            </li>
            </ul>
          )
        default:
      }
    }
  }
  const dripGutterUpgrade = () => {
    if (roofTemplate.metalEdge) {
      if (!roofTemplate.dripEaves && !roofTemplate.apronEaves && !roofTemplate.dripRakes) {
        return (
          <ul>
            <h4>Existing Shingle Upgrades</h4>
            <li className="upgrade-li" >Drip Eaves
            <input
            type="checkbox"
            checked={choosenUpgrades.dripEaves === true }
            onChange={(e) => setChoosenUpgrades({ ...choosenUpgrades, dripEaves: !choosenUpgrades.dripEaves })}/>
            </li>

            <li className="upgrade-li" >Drip Rakes
            <input
            type="checkbox"
            checked={choosenUpgrades.dripRakes === true }
            onChange={(e) => setChoosenUpgrades({ ...choosenUpgrades, dripRakes: !choosenUpgrades.dripRakes })}/>
            </li>

            <li className="upgrade-li" >Gutter Apron Eaves
            <input
            type="checkbox"
            checked={choosenUpgrades.gutterEaves === true }
            onChange={(e) => setChoosenUpgrades({ ...choosenUpgrades, gutterEaves: !choosenUpgrades.gutterEaves })}/>
            </li>
          </ul>
        )
      }
      if (!roofTemplate.dripEaves && !roofTemplate.apronEaves) {
        return (
          <ul>
            <h4>Existing Shingle Upgrades</h4>
            <li className="upgrade-li" >Drip Eaves
            <input
            type="checkbox"
            checked={choosenUpgrades.dripEaves === true }
            onChange={(e) => setChoosenUpgrades({ ...choosenUpgrades, dripEaves: !choosenUpgrades.dripEaves })}/>
            </li>

            <li className="upgrade-li" >Gutter Apron Eaves
            <input
            type="checkbox"
            checked={choosenUpgrades.gutterEaves === true }
            onChange={(e) => setChoosenUpgrades({ ...choosenUpgrades, gutterEaves: !choosenUpgrades.gutterEaves })}/>
            </li>
          </ul>        )
      }
      if (!roofTemplate.dripEaves && !roofTemplate.dripRakes) {
        return (
          <ul>
            <h4>Existing Shingle Upgrades</h4>
            <li className="upgrade-li" >Drip Eaves
            <input
            type="checkbox"
            checked={choosenUpgrades.dripEaves === true }
            onChange={(e) => setChoosenUpgrades({ ...choosenUpgrades, dripEaves: !choosenUpgrades.dripEaves })}/>
            </li>

            <li className="upgrade-li" >Drip Rakes
            <input
            type="checkbox"
            checked={choosenUpgrades.dripRakes === true }
            onChange={(e) => setChoosenUpgrades({ ...choosenUpgrades, dripRakes: !choosenUpgrades.dripRakes })}/>
            </li>
          </ul>
        )
      }
      if (!roofTemplate.apronEaves && !roofTemplate.dripRakes) {
        return (
          <ul>
            <h4>Existing Shingle Upgrades</h4>

            <li className="upgrade-li" >Drip Rakes
            <input
            type="checkbox"
            checked={choosenUpgrades.dripRakes === true }
            onChange={(e) => setChoosenUpgrades({ ...choosenUpgrades, dripRakes: !choosenUpgrades.dripRakes })}/>
            </li>

            <li className="upgrade-li" >Gutter Apron Eaves
            <input
            type="checkbox"
            checked={choosenUpgrades.gutterEaves === true }
            onChange={(e) => setChoosenUpgrades({ ...choosenUpgrades, gutterEaves: !choosenUpgrades.gutterEaves })}/>
            </li>
          </ul>
        )
      }
      if (!roofTemplate.dripEaves) {
        return (
          <ul>
            <h4>Existing Shingle Upgrades</h4>
            <li className="upgrade-li" >Drip Eaves
            <input
            type="checkbox"
            checked={choosenUpgrades.dripEaves === true }
            onChange={(e) => setChoosenUpgrades({ ...choosenUpgrades, dripEaves: !choosenUpgrades.dripEaves })}/>
            </li>

          </ul>
        )
      }
      if (!roofTemplate.dripRakes) {
        return (
          <ul>
            <h4>Existing Shingle Upgrades</h4>

            <li className="upgrade-li" >Drip Rakes
            <input
            type="checkbox"
            checked={choosenUpgrades.dripRakes === true }
            onChange={(e) => setChoosenUpgrades({ ...choosenUpgrades, dripRakes: !choosenUpgrades.dripRakes })}/>
            </li>
          </ul>
        )
      }
      if (!roofTemplate.apronEaves) {
        return (
          <ul>
            <h4>Existing Shingle Upgrades</h4>
            <li className="upgrade-li" >Gutter Apron Eaves
            <input
            type="checkbox"
            checked={choosenUpgrades.gutterEaves === true }
            onChange={(e) => setChoosenUpgrades({ ...choosenUpgrades, gutterEaves: !choosenUpgrades.gutterEaves })}/>
            </li>
          </ul>
        )
      }
    }
  }
  const valleyMetalUpgrade = () => {
    if (roofTemplate.valleyMetal) {
      if (!roofTemplate.valleyMetalRolled && !roofTemplate.valleyMetalW) {
        return (
          <ul>
            <h4>Valley Metal Upgrade</h4>

            <li className="upgrade-li" >"W"
            <input
            type="checkbox"
            checked={choosenUpgrades.valleyMetalW === true }
            onChange={(e) => setChoosenUpgrades({ ...choosenUpgrades, valleyMetalW: !choosenUpgrades.valleyMetalW })}/>
            </li>

          </ul>
        )
      }
      else if (roofTemplate.valleyMetalW) {
        return (
          <>
          <ul>
          <h4>Valley Metal Upgrades</h4>
            <li className="upgrade-li" >{!roofTemplate.wPainter &&
              <>
              Painter
              <input
              type="checkbox"
              checked={choosenUpgrades.valleyMetalPainted === true }
              onChange={(e) => setChoosenUpgrades({ ...choosenUpgrades, valleyMetalPainted: !choosenUpgrades.valleyMetalPainted })}/>
              </>
            }</li>
            <li className="upgrade-li" >{!roofTemplate.wGalvanized &&
              <>
              Galvanized
              <input
              type="checkbox"
              checked={choosenUpgrades.valleyMetalGalvanized === true }
              onChange={(e) => setChoosenUpgrades({ ...choosenUpgrades, valleyMetalGalvanized: !choosenUpgrades.valleyMetalGalvanized })}/>
              </>
            }</li>
            <li className="upgrade-li" >{!roofTemplate.wCopper &&
              <>
              Copper
              <input
              type="checkbox"
              checked={choosenUpgrades.valleyMetalCopper === true }
              onChange={(e) => setChoosenUpgrades({ ...choosenUpgrades, valleyMetalCopper: !choosenUpgrades.valleyMetalCopper })}/>
              </>
            }</li>
          </ul>
          </>
        )
      }
    }
  }
  const feltUpgrade = () => {
    return (
      <ul>
        <h4>Felt Underlayment Upgrades</h4>
        <li className="upgrade-li" >
          #15
          <input
          type="checkbox"
          checked={choosenUpgrades.fifteenFelt === true }
          onChange={(e) => setChoosenUpgrades({ ...choosenUpgrades, fifteenFelt: !choosenUpgrades.fifteenFelt })}/>
        </li>
        <li className="upgrade-li" >
          #30
          <input
          type="checkbox"
          checked={choosenUpgrades.thirtyFelt === true }
          onChange={(e) => setChoosenUpgrades({ ...choosenUpgrades, thirtyFelt: !choosenUpgrades.thirtyFelt })}/>
        </li>
      </ul>
    )
  }
  const syntheticUpgrade = () => {
    switch (roofTemplate.synthetic) {
      case "builder":
      return (
      <ul>
      <h4>Synthetic Underlayment Upgrades</h4>

        <li className="upgrade-li" >Better Grade<input
        type="checkbox"
        checked={choosenUpgrades.betterSynth === true }
        onChange={(e) => setChoosenUpgrades({ ...choosenUpgrades, betterSynth: !choosenUpgrades.betterSynth })}/>
        </li>

        <li className="upgrade-li" >Best Grade<input
        type="checkbox"
        checked={choosenUpgrades.bestSynth === true }
        onChange={(e) => setChoosenUpgrades({ ...choosenUpgrades, bestSynth: !choosenUpgrades.bestSynth })}/>
        </li>
      </ul>
    )
      case "better":
      return (
      <ul>
      <h4>Synthetic Underlayment Upgrades</h4>
        <li className="upgrade-li" >Best Grade<input
        type="checkbox"
        checked={choosenUpgrades.bestSynth === true }
        onChange={(e) => setChoosenUpgrades({ ...choosenUpgrades, bestSynth: !choosenUpgrades.bestSynth })}/>
        </li>
      </ul>
    )
      default:
      <></>
    }
  }
  const ridgeCapUpgrade = () => {
    if (roofTemplate.tab) {
      return (
      <ul>
      <h4>Ridge Cap Upgrades</h4>

        <li className="upgrade-li" >Standard Profile<input
        type="checkbox"
        checked={choosenUpgrades.standardRidge === true }
        onChange={(e) => setChoosenUpgrades({ ...choosenUpgrades, standardRidge: !choosenUpgrades.standardRidge })}/>
        </li>

        <li className="upgrade-li" >High Profile<input
        type="checkbox"
        checked={choosenUpgrades.highRidge === true }
        onChange={(e) => setChoosenUpgrades({ ...choosenUpgrades, highRidge: !choosenUpgrades.highRidge })}/>
        </li>
      </ul>
    )
  }
    else if (roofTemplate.standard) {
      return (
        <ul>
        <h4>Ridge Cap Upgrades</h4>

          <li className="upgrade-li" >High Profile<input
          type="checkbox"
          checked={choosenUpgrades.highRidge === true }
          onChange={(e) => setChoosenUpgrades({ ...choosenUpgrades, highRidge: !choosenUpgrades.highRidge })}/>
          </li>
        </ul>
      )
    }
  }
  const stepUpgrade = () => {
    if (roofTemplate.stepAluminum) {
      return (
      <ul>
      <h4>Step Flashing Upgrades</h4>
        <li className="upgrade-li" >Copper<input
        type="checkbox"
        checked={choosenUpgrades.sFCopper === true }
        onChange={(e) => setChoosenUpgrades({ ...choosenUpgrades, sFCopper: !choosenUpgrades.sFCopper })}/>
        </li>
        <li className="upgrade-li" >Galvanized<input
        type="checkbox"
        checked={choosenUpgrades.sFGalvan === true }
        onChange={(e) => setChoosenUpgrades({ ...choosenUpgrades, sFGalvan: !choosenUpgrades.sFGalvan })}/>
        </li>
      </ul>
      )
    }
    else if (roofTemplate.stepCopper) {
      return (
      <ul>
      <h4>Step Flashing Upgrades</h4>

        <li className="upgrade-li" >Galvanized<input
        type="checkbox"
        checked={choosenUpgrades.sFGalvan === true }
        onChange={(e) => setChoosenUpgrades({ ...choosenUpgrades, sFGalvan: !choosenUpgrades.sFGalvan })}/>
        </li>
      </ul>
      )
    }
  }
  const counterUpgrade = () => {
    if (roofTemplate.counterAluminum) {
      return (
      <ul>
      <h4>Counter Flashing Upgrades</h4>
        <li className="upgrade-li" >Copper<input
        type="checkbox"
        checked={choosenUpgrades.cFCopper === true }
        onChange={(e) => setChoosenUpgrades({ ...choosenUpgrades, cFCopper: !choosenUpgrades.cFCopper })}/>
        </li>
        <li className="upgrade-li" >Galvanized<input
        type="checkbox"
        checked={choosenUpgrades.cFGalvan === true }
        onChange={(e) => setChoosenUpgrades({ ...choosenUpgrades, cFGalvan: !choosenUpgrades.cFGalvan })}/>
        </li>
      </ul>
      )
    }
    else if (roofTemplate.counterCopper) {
      return (
      <ul>
      <h4>Counter Flashing Upgrades</h4>

        <li className="upgrade-li" >Galvanized<input
        type="checkbox"
        checked={choosenUpgrades.cFGalvan === true }
        onChange={(e) => setChoosenUpgrades({ ...choosenUpgrades, cFGalvan: !choosenUpgrades.cFGalvan })}/>
        </li>
      </ul>
      )
    }
  }
  const chimneyUpgrade = () => {
    if (roofTemplate.chimneyAluminum) {
      return (
      <ul>
      <h4>Chimney Flashing Upgrades</h4>
        <li className="upgrade-li" >Copper<input
        type="checkbox"
        checked={choosenUpgrades.chFCopper === true }
        onChange={(e) => setChoosenUpgrades({ ...choosenUpgrades, chFCopper: !choosenUpgrades.chFCopper })}/>
        </li>
        <li className="upgrade-li" >Galvanized<input
        type="checkbox"
        checked={choosenUpgrades.chFGalvan === true }
        onChange={(e) => setChoosenUpgrades({ ...choosenUpgrades, chFGalvan: !choosenUpgrades.chFGalvan })}/>
        </li>
      </ul>
      )
    }
    else if (roofTemplate.chimneyCopper) {
      return (
      <ul>
      <h4>Chimney Flashing Upgrades</h4>

        <li className="upgrade-li" >Galvanized<input
        type="checkbox"
        checked={choosenUpgrades.chFGalvan === true }
        onChange={(e) => setChoosenUpgrades({ ...choosenUpgrades, chFGalvan: !choosenUpgrades.chFGalvan })}/>
        </li>
      </ul>
      )
    }
  }


  switch (roofTemplate.step) {
    default:
    case "0":
      return (
        <>
        <div className="question-container">
        <StepZero roofTemplate={roofTemplate} setRoofTemplate={setRoofTemplate}/>
        <div className="surv-accent1"></div>
        </div>
        <button className="survey-btn next" onClick={() => zeroNext()}><i class="fas fa-chevron-right"></i></button>
        </>
      )
    case "1":

        return (
          <>
          <div className="question-container">
          <StepOne roofTemplate={roofTemplate} handleMeasurementChange={handleMeasurementChange}/>
          <div className="surv-accent1"></div>
          </div>
          <button className="survey-btn prev" onClick={() => onePrev()}><i class="fas fa-chevron-left"></i></button>
          <button className="survey-btn next" onClick={() => oneNext()}><i class="fas fa-chevron-right"></i></button>
          </>
        )
    case "manual":
        return (
          <>
          <div className="question-container">
          <h1 className="surv-header">Manual page</h1>
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
                <div className="manual-label">
                  <label>Rake</label>
                  <input
                  type="number"
                  value={roofTemplate.rake}
                  onChange={(e) => setRoofTemplate({ ...roofTemplate, rake: e.target.value })}

                  />
                </div>
                <div className="manual-label">
                  <label>Eave</label>
                  <input
                  type="number"
                  value={roofTemplate.eave}
                  onChange={(e) => setRoofTemplate({ ...roofTemplate, eave: e.target.value })}

                  />
                </div>
              </div>
            </div>
            <div className="manual-form">
              <div className="hz-surv">
                <div className="manual-label">
                   <label>Counter Flashing</label>
                  <input
                  type="number"
                  value={roofTemplate.counterFlashing}
                  onChange={(e) => setRoofTemplate({ ...roofTemplate, counterFlashing: e.target.value })}

                  />
                </div>
                <div className="manual-label">
                  <label>Step Flashing</label>
                  <input
                  type="number"
                  value={roofTemplate.stepFlashing}
                  onChange={(e) => setRoofTemplate({ ...roofTemplate, stepFlashing: e.target.value })}

                  />
                </div>
                <div className="manual-label">
                  <label>Parapets</label>
                  <input
                  type="number"
                  value={roofTemplate.parapets}
                  onChange={(e) => setRoofTemplate({ ...roofTemplate, parapets: e.target.value })}

                  />
              </div>
            </div>
          </div>

          </div>
          <div className="surv-accent1"></div>

          </div>
          <button className="survey-btn prev" onClick={() => manualPrev()}><i class="fas fa-chevron-left"></i></button>
          <button className="survey-btn next" onClick={() => {
            setRoofTemplate({ ...roofTemplate, xmlType: "" })
            manualNext()
          }}><i class="fas fa-chevron-right"></i></button>

          </>
        )
    case "xml":
        return (
          <>
          <div className="question-container">

            <h1 className="surv-header">.XML Upload</h1>
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
            <div className="surv-accent1"></div>

            </div>
            <button className="survey-btn" onClick={() => console.log("fix me")}><i class="fas fa-chevron-left"></i></button>
            <button className="survey-btn next" onClick={() => console.log("fix me")}><i class="fas fa-chevron-right"></i></button>

          </>
        )
    case "roofType":
          return (
            <>
            <div className="question-container">
            <h1 className="surv-header">Roof Type</h1>
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
            <div className="surv-accent1"></div>

            </div>
            <button className="survey-btn prev" onClick={() => roofTypePrev()}><i class="fas fa-chevron-left"></i></button>
            <button className="survey-btn next" onClick={() => roofTypeNext()}><i class="fas fa-chevron-right"></i></button>
            </>
          )
    case "asphalt":
            return (
              <>
              <div className="question-container">
              <h1 className="surv-header">Existing Shingle</h1>
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
              <div className="surv-accent1"></div>

              </div>
              <button className="survey-btn prev" onClick={() => asphaltPrev()}><i class="fas fa-chevron-left"></i></button>
              <button className="survey-btn next" onClick={() => asphaltNext()}><i class="fas fa-chevron-right"></i></button>
              </>
            )
          // if user went down different path we need to reset that state here
    case "metal":
          return (
            <>
            <div className="question-container">
            <h1 className="surv-header">Metal Edge</h1>
            <div className="form-group">
              <label>Metal Edge</label>
              <input
              style={{ width:"40px", height: "40px" }}
              type="checkbox"
              checked={roofTemplate.metalEdge === true }
              onChange={(e) => setRoofTemplate({ ...roofTemplate, metalEdge: !roofTemplate.metalEdge })}
              />
            </div>
            <div className="surv-accent1"></div>

              </div>
              <button className="survey-btn prev" onClick={() => metalPrev()}><i class="fas fa-chevron-left"></i></button>
              <button className="survey-btn next" onClick={() => metalNext()}><i class="fas fa-chevron-right"></i></button>

            </>
          )
    case "3-tab":
          return (
            <>
            <div className="question-container">
            <h1 className="surv-header">3-Tab</h1>
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
            <div className="surv-accent1"></div>

            </div>
            <button className="survey-btn prev" onClick={() => threePrev()}><i class="fas fa-chevron-left"></i></button>
            <button className="survey-btn next" onClick={() => threeNext()}><i class="fas fa-chevron-right"></i></button>

            </>
          )
    case "laminate":
          return (
            <>
            <div className="question-container">
            <h1 className="surv-header">Laminate</h1>
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
            <div className="surv-accent1"></div>

            </div>
            <button className="survey-btn prev" onClick={() => laminatePrev()}><i class="fas fa-chevron-left"></i></button>
            <button className="survey-btn next" onClick={() => laminateNext()}><i class="fas fa-chevron-right"></i></button>

            </>
          )
    case "bol-valley-metal":
        return (
          <>
          <div className="question-container">

          <h1 className="surv-header">Valley Metal</h1>
          <div className="form-group">
          <label>Valley Metal</label>
          <input
          style={{ width:"40px", height: "40px" }}
          type="checkbox"
          checked={roofTemplate.valleyMetal === true }
          onChange={(e) => setRoofTemplate({ ...roofTemplate, valleyMetal: !roofTemplate.valleyMetal })}
          />
          </div>
          <div className="surv-accent1"></div>

          </div>
          <button className="survey-btn prev" onClick={ () => bolValleyMetalPrev()}><i class="fas fa-chevron-left"></i></button>
          <button className="survey-btn next" onClick={() => bolValleyMetalNext()}><i class="fas fa-chevron-right"></i></button>

          </>
        )
    case "underlayment":
        return (
          <>
          <div className="question-container">

            <h1 className="surv-header">Underlayment</h1>
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
            <div className="surv-accent1"></div>

            </div>
            <button className="survey-btn prev" onClick={() => underlaymentPrev()}><i class="fas fa-chevron-left"></i></button>
            <button className="survey-btn next" onClick={() => underlaymentNext()}><i class="fas fa-chevron-right"></i></button>

          </>
        )
    case "valley-metal":
          return (
            <>
            <div className="question-container">

            <h1 className="surv-header">Valley Metal</h1>
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
            <div className="surv-accent1"></div>

            </div>
            <button className="survey-btn prev" onClick={ () => valleyMetalPrev()}><i class="fas fa-chevron-left"></i></button>
            <button className="survey-btn next" onClick={() => valleyMetalNext()}><i class="fas fa-chevron-right"></i></button>

            </>
          )
    case "valley-metal-w":
          return (
            <>
            <div className="question-container">

            <h1 className="surv-header">Valley Metal "W"</h1>
            <div className="form-group">
            <label>Painted</label>
            <input
            style={{ width:"40px", height: "40px" }}
            type="checkbox"
            checked={roofTemplate.wPainter === true }
            onChange={(e) => setRoofTemplate({ ...roofTemplate, wPainter: !roofTemplate.wPainter })}
            />
            <label>Galvanized</label>
            <input
            style={{ width:"40px", height: "40px" }}
            type="checkbox"
            checked={roofTemplate.wGalvanized === true }
            onChange={(e) => setRoofTemplate({ ...roofTemplate, wGalvanized: !roofTemplate.wGalvanized })}
            />
            <label>Copper</label>
            <input
            style={{ width:"40px", height: "40px" }}
            type="checkbox"
            checked={roofTemplate.wCopper === true }
            onChange={(e) => setRoofTemplate({ ...roofTemplate, wCopper: !roofTemplate.wCopper })}
            />
            </div>
            <div className="surv-accent1"></div>

            </div>
            <button className="survey-btn prev" onClick={ () => valleyMetalWPrev()}><i class="fas fa-chevron-left"></i></button>
            <button className="survey-btn next" onClick={() => valleyMetalWNext()}><i class="fas fa-chevron-right"></i></button>

            </>
          )
    case "ice-water-bool":
          return (
            <>
            <div className="question-container">
            <h1 className="surv-header">Ice and Water</h1>
            <div className="form-group">
              <label>Ice and Water Barrier</label>
              <input
              style={{ width:"40px", height: "40px" }}
              type="checkbox"
              checked={roofTemplate.iceBool=== true }
              onChange={(e) => setRoofTemplate({ ...roofTemplate, iceBool: !roofTemplate.iceBool })}
              />

            </div>
            <div className="surv-accent1"></div>

            </div>
            <button className="survey-btn prev" onClick={() => iceWaterBoolPrev()}><i class="fas fa-chevron-left"></i></button>
            <button className="survey-btn next" onClick={() => iceWaterBoolNext()}><i class="fas fa-chevron-right"></i></button>

            </>
          )
    case "synthetic":
          // if user went down different path we need to reset that state here
          return (
            <>
            <div className="question-container">
            <h1 className="surv-header">Synthetic</h1>
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
              <div className="surv-accent1"></div>

              </div>
              <button className="survey-btn prev" onClick={() => syntheticPrev()}><i class="fas fa-chevron-left"></i></button>
              <button className="survey-btn next" onClick={() => syntheticNext()}><i class="fas fa-chevron-right"></i></button>

            </>
          )
    case "pipejacks":
        return (
        <>
        <div className="question-container">
        <h1 className="surv-header">Pipejacks</h1>

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
        <div className="surv-accent1"></div>

        </div>
        <button className="survey-btn prev" onClick={() => pipejacksPrev()}><i class="fas fa-chevron-left"></i></button>
        <button className="survey-btn next" onClick={() => pipejacksNext()}><i class="fas fa-chevron-right"></i></button>

        </>
      )
    case "neoprene":
          return (
            <>
            <div className="question-container">

            <h1 className="surv-header">Neoprene/Hard Plastic</h1>
              <div className="form-group">
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
              <div className="surv-accent1"></div>

              </div>
              <button className="survey-btn prev" onClick={() => neoprenePrev()}><i class="fas fa-chevron-left"></i></button>
              <button className="survey-btn next" onClick={() => neopreneNext()}><i class="fas fa-chevron-right"></i></button>

            </>
          )
    case "ice-water":
          return (
            <>
            <div className="question-container">

            <h1 className="surv-header">Ice and Water Barrier</h1>

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
            <div className="surv-accent1"></div>

            </div>
            <button className="survey-btn prev" onClick={() => iceWaterPrev()}><i class="fas fa-chevron-left"></i></button>
            <button className="survey-btn next" onClick={() => iceWaterNext()}><i class="fas fa-chevron-right"></i></button>

            </>
          )
    case "ridge-vent":
          return (
          <>
          <div className="question-container">

          <h1 className="surv-header">Ventilation</h1>
          <div className="form-group">
            <label>Ridge Vent</label>
            <input
            style={{ width:"40px", height: "40px" }}
            type="checkbox"
            checked={roofTemplate.ridgeVent === true }
            onChange={(e) => setRoofTemplate({ ...roofTemplate, ridgeVent: !roofTemplate.ridgeVent })}
            />
          </div>
          <div className="surv-accent1"></div>

          </div>
          <button className="survey-btn prev" onClick={() => ridgeVentPrev()}><i class="fas fa-chevron-left"></i></button>
          <button className="survey-btn next" onClick={() => ridgeVentNext()}><i class="fas fa-chevron-right"></i></button>

          </>
          )
    case "drip-gutter":
          return (
            <>
            <div className="question-container">
            <h1 className="surv-header">Drip</h1>
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
            <div className="surv-accent1"></div>

              </div>
              <button className="survey-btn prev" onClick={() => dripGutterPrev()}><i class="fas fa-chevron-left"></i></button>
              <button className="survey-btn next" onClick={() => dripGutterNext()}><i class="fas fa-chevron-right"></i></button>

            </>
          )
    case "ridge":
          return (
            <>
            <div className="question-container">

              <h1 className="surv-header">Ridge Cap</h1>
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
              <div className="surv-accent1"></div>

              </div>
              <button className="survey-btn prev" onClick={() => ridgePrev()}><i class="fas fa-chevron-left"></i></button>
              <button className="survey-btn next" onClick={() => ridgeNext()}><i class="fas fa-chevron-right"></i></button>

            </>
          )
    case 'step-flashing':
          return (
            <>
            <div className="question-container">
            <h1 className="surv-header">Step Flashing</h1>

            <div className="form-group">
            <label>Aluminum</label>
            <input
            style={{ width:"40px", height: "40px" }}
            type="checkbox"
            checked={roofTemplate.stepAluminum === true }
            onChange={(e) => setRoofTemplate({ ...roofTemplate, stepAluminum: !roofTemplate.stepAluminum })}
            />
            <label>Copper</label>
            <input
            style={{ width:"40px", height: "40px" }}
            type="checkbox"
            checked={roofTemplate.stepCopper === true }
            onChange={(e) => setRoofTemplate({ ...roofTemplate, stepCopper: !roofTemplate.stepCopper })}
            />
            <label>Galvanized Metal</label>
            <input
            style={{ width:"40px", height: "40px" }}
            type="checkbox"
            checked={roofTemplate.stepGalvanized === true }
            onChange={(e) => setRoofTemplate({ ...roofTemplate, stepGalvanized: !roofTemplate.stepGalvanized })}
            />
            </div>
            <div className="surv-accent1"></div>

            </div>
            <button className="survey-btn prev" onClick={() => stepFlashingPrev()}><i class="fas fa-chevron-left"></i></button>
            <button className="survey-btn next" onClick={() => stepFlashingNext()}><i class="fas fa-chevron-right"></i></button>

            </>
          )
    case 'counter-flashing':
          return (
            <>
            <div className="question-container">
            <h1 className="surv-header">Counter Flashing</h1>

            <div className="form-group">
            <label>Aluminum</label>
            <input
            style={{ width:"40px", height: "40px" }}
            type="checkbox"
            checked={roofTemplate.counterAluminum === true }
            onChange={(e) => setRoofTemplate({ ...roofTemplate, counterAluminum: !roofTemplate.counterAluminum })}
            />
            <label>Copper</label>
            <input
            style={{ width:"40px", height: "40px" }}
            type="checkbox"
            checked={roofTemplate.counterCopper === true }
            onChange={(e) => setRoofTemplate({ ...roofTemplate, counterCopper: !roofTemplate.counterCopper })}
            />
            <label>Painted Metal</label>
            <input
            style={{ width:"40px", height: "40px" }}
            type="checkbox"
            checked={roofTemplate.counterPainted === true }
            onChange={(e) => setRoofTemplate({ ...roofTemplate, counterPainted: !roofTemplate.counterPainted })}
            />
            </div>
            <div className="surv-accent1"></div>

            </div>
            <button className="survey-btn prev" onClick={() => counterFlashingPrev()}><i class="fas fa-chevron-left"></i></button>
            <button className="survey-btn next" onClick={() => counterFlashingNext()}><i class="fas fa-chevron-right"></i></button>

            </>
          )
    case 'chimney-flashing':
          return (
            <>
            <div className="question-container">
            <h1 className="surv-header">Chimney Flashing</h1>

            <div className="form-group">
            <label>Aluminum</label>
            <input
            style={{ width:"40px", height: "40px" }}
            type="checkbox"
            checked={roofTemplate.chimneyAluminum === true }
            onChange={(e) => setRoofTemplate({ ...roofTemplate, chimneyAluminum: !roofTemplate.chimneyAluminum })}
            />
            <label>Copper</label>
            <input
            style={{ width:"40px", height: "40px" }}
            type="checkbox"
            checked={roofTemplate.chimneyCopper === true }
            onChange={(e) => setRoofTemplate({ ...roofTemplate, chimneyCopper: !roofTemplate.chimneyCopper })}
            />
            <label>Lead</label>
            <input
            style={{ width:"40px", height: "40px" }}
            type="checkbox"
            checked={roofTemplate.chimneyLead === true }
            onChange={(e) => setRoofTemplate({ ...roofTemplate, chimneyLead: !roofTemplate.chimneyLead })}
            />
            <label>Painted Metal</label>
            <input
            style={{ width:"40px", height: "40px" }}
            type="checkbox"
            checked={roofTemplate.chimneyPainted === true }
            onChange={(e) => setRoofTemplate({ ...roofTemplate, chimneyPainted: !roofTemplate.chimneyPainted })}
            />
            </div>
            <div className="surv-accent1"></div>

            </div>
             <button className="survey-btn prev" onClick={() => chimneyFlashingPrev()}><i class="fas fa-chevron-left"></i></button>
              <button className="survey-btn next" onClick={() => chimneyFlashingNext()}><i class="fas fa-chevron-right"></i></button>

            </>
          )

    case "upgrade-tool":
          return   (
            <>
            <div className="upgradeOptions-container">
            <h1 className="surv-header" style={{ height: '50px'}}>Available Upgrades</h1>

            <div className="upgrade-item">
            {existingShingleUpgrade()}
            </div>
            <div className="upgrade-item">
            {feltUpgrade()}
            </div>
            <div className="upgrade-item">
            {syntheticUpgrade()}
            </div>
            <div className="upgrade-item">
            {dripGutterUpgrade()}
            </div>
            <div className="upgrade-item">
            {valleyMetalUpgrade()}
            </div>
            <div className="upgrade-item">
            {ridgeCapUpgrade()}
            </div>
            <div className="upgrade-item">
            {stepUpgrade()}
            </div>
            <div className="upgrade-item">
            {counterUpgrade()}
            </div>
            <div className="upgrade-item">
            {chimneyUpgrade()}
            </div>


            </div>
            <button className="survey-btn prev" onClick={() => upgradeToolPrev()}><i class="fas fa-chevron-left"></i></button>
            <button className="survey-btn next" onClick={() => console.log("fix me")}><i class="fas fa-chevron-right"></i></button>

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
