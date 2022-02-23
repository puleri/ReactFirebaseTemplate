import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Container'

import StepZero from './StepZero.js';
import StepOne from './StepOne.js';


// import { useLocation } from "react-router-dom";
import './UpgradeTool.css';

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    };
  }
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

// const emptyPromise = new Promise((res, err) => {
//   console.log('promise')
//   console.log("error is ", err)
// })


export default function UpgradeTool() {

  // const [[page, direction], setPage] = useState([0, 1]);

//   const paginate = (newDirection: number) => {
//   setPage([page + newDirection, newDirection]);
// };


  // const location = useLocation();
  // const paths = location.pathname.split("/");
  // let session_uuid = paths[2];
// console.log("location is," , location)

// setting left animation for survey

  const [goingBackTo, setGoingBackTo] = useState('');
  const [prevSlideMotion, setPrevSlideMotion] = useState('');

  // true means forwards, false means backwards
  const [direction, setDirection] = useState(true);
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
    pipeJacksNeo: "",
    pipeJacksOther: "",
    ridgeVent: false,
    underlayment: "",
    tab3: false,
    standard: false,
    highProf: false,
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
    materials: "select",
    bolStep: ' ',
    bolCounter: ' ',
    bolChimney: ' ',
   })
  const [upgradeOptions, setUpgradeOptions] = useState({
      twentyTab: false,
      twentyFiveTab: false,
      oakridgeTab: false,
      durationTab: false,
      durationDesignerTab: false,
      berkshireTab: false,
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

  const [chosenUpgrades, setChosenUpgrades] = useState({
    twentyFiveTab: false,
    oakridgeTab: false,
    durationTab: false,
    durationDesignerTab: false,
    berkshireTab: false,

    builderLam: false,
    highLam: false,
    designerLam: false,
    specialtyLam: false,
    doubleLam: false,
    tripleLam: false,

    synth: false,

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
    cFPainted: false,

    chFAlum: false,
    chFCopper: false,
    chFLead: false,
    chFPainted: false,
  })

  // upgrades with string names and number prices
  const upgradeObjects = {
    'twentyFiveTab': {
      name: "25 Year 3-Tab",
      price: 200
    },
    'oakridgeTab': {
      name: "Oakridge",
      price: 200
    },
    'durationTab': {
      name: "Duration",
      price: 200
    },
    'durationDesignerTab': {
      name: "Duration Designer",
      price: 200
    },
    'berkshireTab': {
      name: "Berkshire",
      price: 200
    },

    'builderLam': {
      name: "Builder grade laminate",
      price: 200
    },
    'highLam': {
      name: "High grade laminate",
      price: 200
    },
    'designerLam': {
      name: "Designer grade laminate",
      price: 200
    },
    'specialtyLam': {
      name: "Specialty grade laminate",
      price: 200
    },
    'doubleLam': {
      name: "Double laminate",
      price: 200
    },
    'tripleLam': {
      name: "Triple laminate",
      price: 200
    },

    'synth': {
      name: "Synthetic Underlayment",
      price: 200
    },

    'builderSynth': {
      name: "Builder grade synthetic underlayment",
      price: 200
    },
    'betterSynth': {
      name: "Better grade synthetic underlayment",
      price: 200
    },
    'bestSynth': {
      name: "Best grade synthetic underlayment",
      price: 200
    },

    'dripRakes': {
      name: "Drip rakes",
      price: 200
    },
    'dripEaves': {
      name: "Drip eaves",
      price: 200
    },
    'gutterEaves': {
      name: "Gutter eaves",
      price: 200
    },

    'valleyMetalW': {
      name: "\"W\" valley metal",
      price: 200
    },
    'valleyMetalPainted': {
      name: "Painted valley metal",
      price: 200
    },
    'valleyMetalGalvanized': {
      name: "Galvanized valley metal",
      price: 200
    },
    'valleyMetalCopper': {
      name: "Copper valley metal",
      price: 200
    },

    'threeRidge': {
      name: "3-Tab ridge cap",
      price: 200
    },
    'standardRidge': {
      name: "Standard profile ridge cap",
      price: 200
    },
    'highRidge': {
      name: "High profile ridge cap",
      price: 200
    },

    'sFAlum': {
      name: "Aluminum step flashing",
      price: 200
    },
    'sFCopper': {
      name: "Copper step flashing",
      price: 200
    },
    'sFGalvan': {
      name: "Galvanized step flashing",
      price: 200
    },

    'cFAlum': {
      name: "Aluminum counter flashing",
      price: 200
    },
    'cFCopper': {
      name: "Copper counter flashing",
      price: 200
    },
    'cFPainted': {
      name: "Painted metal counter flashing",
      price: 200
    },

    'chFAlum': {
      name: "Aluminum chimney flashing",
      price: 200
    },
    'chFCopper': {
      name: "Copper chimney flashing",
      price: 200
    },
    'chFLead': {
      name: "Lead chimney flashing",
      price: 200
    },
    'chFPainted': {
      name: "Painted metal chimney flashing",
      price: 200
    },
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
    // setDirection(1)
    setPrevSlideMotion('0')
    setIsShown("1"); setTimeout( ()=> {
    setRoofTemplate({
      ...roofTemplate, step: '1'
    })
  }
    , 700)
  }
  const oneNext = () => {
    // When exiting to the right we set this as the previous slide
    setPrevSlideMotion('1')

    setTimeout( () => {
      setIsShown("manual");
    }, 0)

    setTimeout( ()=> {
    setRoofTemplate({
      ...roofTemplate, step: "manual"
      })
    }, 700)

  }
  const onePrev = () => {
    async function prev() {
      try {
      await setDirection(false)
    } catch(e) {
      console.log(e)
    } finally {
      setGoingBackTo('0')
      setPrevSlideMotion('0')
      setIsShown("0");
      setTimeout( ()=> {
      setRoofTemplate({ ...roofTemplate, step: '0'})
    }
      , 700)
    }
        // when exiting to the previous slide we set our destination so we can check when setting out exit
  }
  prev()
}
  // xmlNext
  const manualNext = () => {
    setPrevSlideMotion('manual')

    setTimeout( () => {
      setIsShown("roofType");
    }, 0)
    setTimeout( ()=> {
    setRoofTemplate({
      ...roofTemplate, step: "roofType"
    })
  }
    , 700)
  }
  const manualPrev = () => {
    async function prev() {
      try {
      await setDirection(false)
    } catch(e) {
      console.log(e)
    } finally {
      setGoingBackTo('1')
      setPrevSlideMotion('1')
      setTimeout( () => {
        setIsShown("1");
      }, 0)
      // setIsShown("1");
      setTimeout( ()=> {
      setRoofTemplate({ ...roofTemplate, step: '1'})
    }
      , 700)
    }
  }
    prev()
 }

  const roofTypeNext = () => {
    setPrevSlideMotion('roofType')

    if (roofTemplate.roofType === "asphalt") {
      setTimeout( () => {
        setIsShown("asphalt");
      }, 0)
      setTimeout( ()=> {
      setRoofTemplate({
        ...roofTemplate,
        step: 'asphalt'
      })
    }, 700)
    }
    else {
      setTimeout( () => {
        setIsShown("underlayment");
      }, 0)
      setTimeout( ()=> {
      setRoofTemplate({
        ...roofTemplate,
        step: 'underlayment'
      })
    }
      , 700)
    }
  }
  const roofTypePrev = () => {

    async function prev() {
      try {
      await setDirection(false)
    } catch(e) {
      console.log(e)
    } finally {
      setGoingBackTo('manual')
      setPrevSlideMotion('manual')
      setTimeout( () => {
        setIsShown("manual");
      }, 0)
      // setIsShown("1");
      setTimeout( ()=> {
        setRoofTemplate({
          ...roofTemplate,
          step: "manual"
        })    }
      , 700)
    }
  }
    prev()
  }
  const asphaltNext = () => {
    setPrevSlideMotion('asphalt')
    if (roofTemplate.existingShingle === "3-tab") {
      setTimeout( () => {
        setIsShown("3-tab");
      }, 0)
      setTimeout( ()=> {
      setRoofTemplate({
        ...roofTemplate,
        step: "3-tab"
      })
    }, 700)
  } else {
    setTimeout( () => {
      setIsShown("laminate");
    }, 0)
    setTimeout( ()=> {
      setRoofTemplate({
      ...roofTemplate,
      step: "laminate"
    })
    }, 700)
  }

  }
  const asphaltPrev = () => {
    async function prev() {
      try {
      await setDirection(false)
    } catch(e) {
      console.log(e)
    } finally {
      setGoingBackTo('roofType')
      setPrevSlideMotion('roofType')
      setTimeout( () => {
        setIsShown("roofType");
      }, 0)
      // setIsShown("1");
      setTimeout( ()=> {
        setRoofTemplate({
          ...roofTemplate,
          step: "roofType"
        })    }
      , 700)
    }
  }
    prev()
  }
  const threeNext = () => {
    setPrevSlideMotion('3-tab')
    if (roofTemplate.tab === "20") {
      setUpgradeOptions({
        ...upgradeOptions,
        twentyTab: true
      })
    }
    setTimeout( () => {
      setIsShown("underlayment");
    }, 0)
      setTimeout( ()=> {
      setRoofTemplate({
        ...roofTemplate,
        step: "underlayment",
      })
      }, 700)
  }
  const threePrev = () => {
    async function prev() {
      try {
      await setDirection(false)
    } catch(e) {
      console.log(e)
    } finally {
      setGoingBackTo('asphalt')
      setPrevSlideMotion('asphalt')
      setTimeout( () => {
        setIsShown("asphalt");
      }, 0)
      // setIsShown("asphalt");
      setTimeout( ()=> {
      setRoofTemplate({ ...roofTemplate, step: 'asphalt'})
    }
      , 700)
    }
  }
    prev()
  }
  const laminateNext = () => {
    setPrevSlideMotion('laminate')
    setTimeout( () => {
      setIsShown("underlayment");
    }, 0)
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
    setTimeout( ()=> {
    setRoofTemplate({
      ...roofTemplate,
      step: "underlayment"
    })
      }, 700)
  }
  const laminatePrev = () => {
    async function prev() {
      try {
      await setDirection(false)
    } catch(e) {
      console.log(e)
    } finally {
      setGoingBackTo('asphalt')
      setPrevSlideMotion('asphalt')
      setTimeout( () => {
        setIsShown("asphalt");
      }, 0)
      // setIsShown("asphalt");
      setTimeout( ()=> {
      setRoofTemplate({ ...roofTemplate, step: 'asphalt'})
    }, 700)
    }
  }
    prev()
  }
  const underlaymentNext = () => {
    setPrevSlideMotion('underlayment')
    if (roofTemplate.underlayment === "synthetic") {
      setTimeout( () => {
        setIsShown("synthetic");
      }, 0)
      setTimeout( ()=> {
    setRoofTemplate({
      ...roofTemplate,
      step: "synthetic"
    })
    }, 700)
  } else {
    setTimeout( () => {
      setIsShown("ice-water-bool");
    }, 0)
    setUpgradeOptions({
      ...upgradeOptions,
      felt: true
    })
    setTimeout( ()=> {
    setRoofTemplate({
      ...roofTemplate,
      step: "ice-water-bool"
    })
    }, 700)
    }
  }
  const underlaymentPrev = () => {
    if (roofTemplate.roofType !== "asphalt") {
      setGoingBackTo('roofType')
      setPrevSlideMotion('roofType')
      setTimeout( () => {
        setIsShown("roofType");
      }, 0)
      setTimeout( ()=> {
      setRoofTemplate({
        ...roofTemplate,
        step: "roofType"
      })
      }, 700)
    } else if (roofTemplate.existingShingle === "3-tab") {
      setGoingBackTo('3-tab')
      setPrevSlideMotion('3-tab')
      setTimeout( () => {
        setIsShown("3-tab");
      }, 0)
      setTimeout( ()=> {
      setRoofTemplate({
        ...roofTemplate,
        step: "3-tab"
      })
      }, 700)
    } else {
      setGoingBackTo('laminate')
      setPrevSlideMotion('laminate')
      setTimeout( () => {
        setIsShown("laminate");
      }, 0)
      setTimeout( ()=> {
      setRoofTemplate({
        ...roofTemplate,
        step: "laminate"
      })
      }, 700)
    }
  }
  const syntheticNext = () => {
    setPrevSlideMotion('synthetic')
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
    setTimeout( () => {
      setIsShown("ice-water-bool");
    }, 0)
    setTimeout( ()=> {
    setRoofTemplate({
      ...roofTemplate,
      step: "ice-water-bool"
    })
      }, 700)
  }
  const syntheticPrev = () => {
    setGoingBackTo('underlayment')
    setPrevSlideMotion('underlayment')
    setTimeout( () => {
      setIsShown("underlayment");
    }, 0)
    setTimeout( ()=> {
    setRoofTemplate({
      ...roofTemplate,
      step: "underlayment"
    })
    }, 700)  }
  const iceWaterBoolNext = () => {
    setPrevSlideMotion('ice-water-bool')
    if (roofTemplate.iceBool === true) {
      setTimeout( () => {
        setIsShown("ice-water");
      }, 0)
      setTimeout( ()=> {
      setRoofTemplate({
        ...roofTemplate,
        step: "ice-water"
      })
      }, 700)
    } else {
      setTimeout( () => {
        setIsShown("metal");
      }, 0)
      setTimeout( ()=> {
      setRoofTemplate({
        ...roofTemplate,
        step: "metal"
      })
      }, 700)
    }
  }
  const iceWaterBoolPrev = () => {
    if (roofTemplate.underlayment==="synthetic") {
      setGoingBackTo('synthetic')
      setPrevSlideMotion('synthetic')
      setTimeout( () => {
        setIsShown("synthetic");
      }, 0)
      setTimeout( ()=> {
      setRoofTemplate({
        ...roofTemplate,
        step: "synthetic"
      })
      }, 700)
    } else {
      setGoingBackTo('underlayment')
      setPrevSlideMotion('underlayment')
      setTimeout( () => {
        setIsShown("underlayment");
      }, 0)
      setTimeout( ()=> {
      setRoofTemplate({
        ...roofTemplate,
        step: "underlayment"
      })
      }, 700)
    }
  }
  const iceWaterNext = () => {
    setPrevSlideMotion('ice-water')
    setTimeout( () => {
      setIsShown("metal");
    }, 0)
    setTimeout( ()=> {
    setRoofTemplate({
      ...roofTemplate,
      step: "metal"
    })
      }, 700)
  }
  const iceWaterPrev = () => {
    setGoingBackTo('ice-water-bool')
    setPrevSlideMotion('ice-water-bool')
    setTimeout( () => {
      setIsShown("ice-water-bool");
    }, 0)
    setTimeout( ()=> {
    setRoofTemplate({
      ...roofTemplate,
      step: "ice-water-bool"
    })
    }, 700)
  }
  const metalNext = () => {
    setPrevSlideMotion('metal')

    if (roofTemplate.metalEdge === true) {
      setTimeout( () => {
        setIsShown("drip-gutter");
      }, 0)
      setTimeout( ()=> {
      setRoofTemplate({
        ...roofTemplate,
        step: "drip-gutter"
      })
      }, 700)
    } else {
      setTimeout( () => {
        setIsShown("pipejacks");
      }, 0)
      setTimeout( ()=> {
      setRoofTemplate({
        ...roofTemplate,
        step: "pipejacks"
      })
      }, 700)
    }
  }
  const metalPrev = () => {
    if (!roofTemplate.iceBool) {
      setGoingBackTo('ice-water-bool')
      setPrevSlideMotion('ice-water-bool')
      setTimeout( () => {
        setIsShown("ice-water-bool");
      }, 0)
      setTimeout( ()=> {
      setRoofTemplate({
        ...roofTemplate,
        step: "ice-water-bool"
      })
      }, 700)
    } else {
      setGoingBackTo('ice-water')
      setPrevSlideMotion('ice-water')
      setTimeout( () => {
        setIsShown("ice-water");
      }, 0)
      setTimeout( ()=> {
      setRoofTemplate({
        ...roofTemplate,
        step: "ice-water"
      })
      }, 700)
    }
  }
  const dripGutterNext = () => {
    setPrevSlideMotion('drip-gutter')
    setTimeout( () => {
      setIsShown("pipejacks");
    }, 0)
    setTimeout( ()=> {
    setRoofTemplate({
      ...roofTemplate,
      step: "pipejacks"
    })
    }, 700)
  }
  const dripGutterPrev = () => {
    setGoingBackTo('metal')
    setPrevSlideMotion('metal')
    setTimeout( () => {
      setIsShown("metal");
    }, 0)
    setTimeout( ()=> {
    setRoofTemplate({
      ...roofTemplate,
      step: "metal"
    })
    }, 700)
  }
  const bolValleyMetalNext = () => {
    setPrevSlideMotion('bol-valley-metal')

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
      setGoingBackTo('metal')
      setPrevSlideMotion('metal')
      setTimeout( () => {
        setIsShown("metal");
      }, 0)
      setTimeout( ()=> {
      setRoofTemplate({
        ...roofTemplate,
        step: "metal"
      })
      }, 700)
    } else {
      setGoingBackTo('drip-gutter')
      setPrevSlideMotion('drip-gutter')
      setTimeout( () => {
        setIsShown("drip-gutter");
      }, 0)
      setTimeout( ()=> {
      setRoofTemplate({
        ...roofTemplate,
        step: "drip-gutter"
      })
      }, 700)
    }
  }
  const valleyMetalNext = () => {
    setPrevSlideMotion('valley-metal')

    if (roofTemplate.valleyMetalW === true) {
      setTimeout( () => {
        setIsShown("valley-metal-w");
      }, 0)
      setTimeout( ()=> {
      setRoofTemplate({
        ...roofTemplate,
        step: "valley-metal-w"
      })
      }, 700)
    } else {
      setTimeout( () => {
        setIsShown("pipejacks");
      }, 0)
      setTimeout( ()=> {
      setRoofTemplate({
        ...roofTemplate,
        step: "pipejacks"
      })
      }, 700)
    }
  }
  const valleyMetalPrev = () => {
    setGoingBackTo('bol-valley-metal')
    setPrevSlideMotion('bol-valley-metal')
    setTimeout( () => {
      setIsShown("bol-valley-metal");
    }, 0)
    setTimeout( ()=> {
    setRoofTemplate({
      ...roofTemplate,
      step: "bol-valley-metal"
    })
    }, 700)
  }
  const valleyMetalWNext = () => {
    setPrevSlideMotion('valley-metal-w')
    setTimeout( () => {
      setIsShown("pipejacks");
    }, 0)
    setTimeout( ()=> {
    setRoofTemplate({
      ...roofTemplate,
      step: "pipejacks"
    })
    }, 700)
  }
  const valleyMetalWPrev = () => {
    setGoingBackTo('valley-metal')
    setPrevSlideMotion('valley-metal')
    setTimeout( () => {
      setIsShown("valley-metal");
    }, 0)
    setTimeout( ()=> {
    setRoofTemplate({
      ...roofTemplate,
      step: "valley-metal"
    })
    }, 700)
  }
  const pipejacksNext = () => {
    // skip neoprene number
    setPrevSlideMotion('pipejacks')
    setTimeout( () => {
      setIsShown("ridge-vent");
    }, 0)
    setTimeout( ()=> {
      setRoofTemplate({
        ...roofTemplate,
        step: "ridge-vent"
      })
      }, 700)
  }
  const pipejacksPrev = () => {
    if (!roofTemplate.metalEdge) {
      setGoingBackTo('metal')
      setPrevSlideMotion('metal')
      setTimeout( () => {
        setIsShown("metal");
      }, 0)
      setTimeout( ()=> {
      setRoofTemplate({
        ...roofTemplate,
        step: "metal"
      })
      }, 700)
    } else if (roofTemplate.valleyMetalW) {
      setGoingBackTo('valley-metal-w')
      setPrevSlideMotion('valley-metal-w')
      setTimeout( () => {
        setIsShown("valley-metal-w");
      }, 0)
      setTimeout( ()=> {
      setRoofTemplate({
        ...roofTemplate,
        step: "valley-metal-w"
      })
      }, 700)
    } else {
      setGoingBackTo('drip-gutter')
      setPrevSlideMotion('drip-gutter')
      setTimeout( () => {
        setIsShown("drip-gutter");
      }, 0)
      setTimeout( ()=> {
      setRoofTemplate({
        ...roofTemplate,
        step: "drip-gutter"
      })
      }, 700)
    }
  }
  const neopreneNext = () => {
    setPrevSlideMotion('neoprene')
    setTimeout( () => {
      setIsShown("ridge-vent");
    }, 0)
    setTimeout( ()=> {
    setRoofTemplate({
      ...roofTemplate,
      step: "ridge-vent"
    })
    }, 700)
  }
  const neoprenePrev = () => {
    setGoingBackTo('pipejacks')
    setPrevSlideMotion('pipejacks')
    setTimeout( () => {
      setIsShown("pipejacks");
    }, 0)
    setTimeout( ()=> {
    setRoofTemplate({
      ...roofTemplate,
      step: "pipejacks"
    })
    }, 700)
  }
  const ridgeVentNext = () => {
    setPrevSlideMotion('ridge-vent')
      setTimeout( () => {
        setIsShown("ridge");
      }, 0)
      setTimeout( ()=> {
      setRoofTemplate({
        ...roofTemplate,
        step: "ridge"
      })
      }, 700)
  }
  const ridgeVentPrev = () => {
    setGoingBackTo('pipejacks')
    setPrevSlideMotion('pipejacks')
    setTimeout( () => {
      setIsShown("pipejacks");
    }, 0)
    setTimeout( ()=> {
    setRoofTemplate({
      ...roofTemplate,
      step: "pipejacks"
    })
    }, 700)
  }
  const ridgeNext = () => {
    setPrevSlideMotion('ridge')
    setTimeout( () => {
      setIsShown("materials-make");
    }, 0)
    setTimeout( ()=> {
    setRoofTemplate({
      ...roofTemplate,
      step: 'materials-make'
    })
    }, 700)
  }
  const ridgePrev = () => {
    setGoingBackTo('ridge-vent')
    setPrevSlideMotion('ridge-vent')
    setTimeout( () => {
      setIsShown("ridge-vent");
    }, 0)
    setTimeout( ()=> {
    setRoofTemplate({
      ...roofTemplate,
      step: "ridge-vent"
    })
    }, 700)
  }
  const bolStepNext = () => {
    setPrevSlideMotion('bol-step')
    if (roofTemplate.bolStep && (roofTemplate.bolStep !== ' ')) {
      setTimeout( () => {
        setIsShown("step-flashing");
      }, 0)
      setTimeout( ()=> {
        setRoofTemplate({ ...roofTemplate, step: 'step-flashing'})
      }, 700)
    } else {
      setTimeout( () => {
        setIsShown("bol-counter");
      }, 0)
      setTimeout( ()=> {
        setRoofTemplate({ ...roofTemplate, step: 'bol-counter'})
      }, 700)
    }
  }
  const bolStepPrev = () => {
    setGoingBackTo('ridge')
    setPrevSlideMotion('ridge')
    setTimeout( () => {
      setIsShown("ridge");
    }, 0)
    setTimeout( ()=> {
    setRoofTemplate({
      ...roofTemplate,
      step: "ridge"
    })
    }, 700)
  }
  const stepFlashingNext = () => {
    setPrevSlideMotion('step-flashing')
    setTimeout( () => {
      setIsShown("bol-counter");
    }, 0)
    setTimeout( ()=> {
    setRoofTemplate({
      ...roofTemplate,
      step: 'bol-counter'
    })
    }, 700)
  }
  const stepFlashingPrev = () => {
    setGoingBackTo('bol-step')
    setPrevSlideMotion('bol-step')
    setTimeout( () => {
      setIsShown("bol-step");
    }, 0)
    setTimeout( ()=> {
    setRoofTemplate({
      ...roofTemplate,
      step: "bol-step"
    })
    }, 700)
 }
  const bolCounterPrev = () => {
    if (roofTemplate.bolStep && (roofTemplate.bolStep !== ' ')) {
      setTimeout( () => {
        setIsShown("step-flashing");
      }, 0)
      setTimeout( ()=> {
        setRoofTemplate({ ...roofTemplate, step: 'step-flashing'})
      }, 700)
    } else {
      setTimeout( () => {
        setIsShown("bol-step");
      }, 0)
      setTimeout( ()=> {
        setRoofTemplate({ ...roofTemplate, step: 'bol-step'})
      }, 700)
    }
  }
  const bolCounterNext = () => {
    setPrevSlideMotion('bol-counter')
    if (roofTemplate.bolCounter && (roofTemplate.bolCounter !== ' ')) {
      setTimeout( () => {
        setIsShown("counter-flashing");
      }, 0)
      setTimeout( ()=> {
        setRoofTemplate({ ...roofTemplate, step: 'counter-flashing'})
      }, 700)
    } else {
      setTimeout( () => {
        setIsShown("bol-chimney");
      }, 0)
      setTimeout( ()=> {
        setRoofTemplate({ ...roofTemplate, step: 'bol-chimney'})
      }, 700)
    }
  }
  const counterFlashingNext = () => {
    setPrevSlideMotion('counter-flashing')
    setTimeout( () => {
      setIsShown("bol-chimney");
    }, 0)
    setTimeout( ()=> {
    setRoofTemplate({
      ...roofTemplate,
      step: 'bol-chimney'
    })
    }, 700)
  }
  const counterFlashingPrev = () => {
    setGoingBackTo('bol-counter')
    setPrevSlideMotion('bol-counter')
    setTimeout( () => {
      setIsShown("bol-counter");
    }, 0)
    setTimeout( ()=> {
    setRoofTemplate({
      ...roofTemplate,
      step: "bol-counter"
    })
    }, 700)
  }
  const bolChimneyPrev = () => {
    if (roofTemplate.bolCounter && (roofTemplate.bolCounter !== ' ')) {
      setTimeout( () => {
        setIsShown("counter-flashing");
      }, 0)
      setTimeout( ()=> {
        setRoofTemplate({ ...roofTemplate, step: 'counter-flashing'})
      }, 700)
    } else {
      setTimeout( () => {
        setIsShown("bol-counter");
      }, 0)
      setTimeout( ()=> {
        setRoofTemplate({ ...roofTemplate, step: 'bol-counter'})
      }, 700)
    }
  }
  const bolChimneyNext = () => {
    if (roofTemplate.bolChimney && (roofTemplate.bolChimney !== ' ')) {
      setTimeout( () => {
        setIsShown("chimney-flashing");
      }, 0)
      setTimeout( ()=> {
        setRoofTemplate({ ...roofTemplate, step: 'chimney-flashing'})
      }, 700)
    } else {
      setTimeout( () => {
        setIsShown("materials-make");
      }, 0)
      setTimeout( ()=> {
        setRoofTemplate({ ...roofTemplate, step: 'materials-make'})
      }, 700)
    }
  }
  const chimneyFlashingNext = () => {
    setPrevSlideMotion('chimney-flashing')

    setTimeout( () => {
      setIsShown("materials-make");
    }, 0)
    setTimeout( ()=> {
    setRoofTemplate({
      ...roofTemplate,
      step: 'materials-make'
    })
    }, 700)
  }
  const chimneyFlashingPrev = () => {
    setGoingBackTo('bol-chimney')
    setPrevSlideMotion('bol-chimney')
    setTimeout( () => {
      setIsShown("bol-chimney");
    }, 0)
    setTimeout( ()=> {
    setRoofTemplate({
      ...roofTemplate,
      step: "bol-chimney"
    })
    }, 700)
  }
  const matsNext = () => {
    setPrevSlideMotion('materials-make')
    setTimeout( () => {
      setIsShown("upgrade-tool");
    }, 0)
    setTimeout( ()=> {
    setRoofTemplate({
      ...roofTemplate,
      step: 'upgrade-tool'
    })
    }, 700)
  }
  const matsPrev = () => {
    setGoingBackTo('ridge')
    setPrevSlideMotion('ridge')
    setTimeout( () => {
      setIsShown("ridge");
    }, 0)
    setTimeout( ()=> {
    setRoofTemplate({
      ...roofTemplate,
      step: "ridge"
    })
    }, 700)
    // if (roofTemplate.bolChimney && (roofTemplate.bolChimney !== ' ')) {
    //   setTimeout( () => {
    //     setIsShown("chimney-flashing");
    //   }, 0)
    //   setTimeout( ()=> {
    //     setRoofTemplate({ ...roofTemplate, step: 'chimney-flashing'})
    //   }, 700)
    // } else {
    //   setTimeout( () => {
    //     setIsShown("bol-chimney");
    //   }, 0)
    //   setTimeout( ()=> {
    //     setRoofTemplate({ ...roofTemplate, step: 'bol-chimney'})
    //   }, 700)
    // }
  }
  const upgradeToolPrev = () => {
    setGoingBackTo('materials-make')
    setPrevSlideMotion('materials-make')
    setTimeout( () => {
      setIsShown("materials-make");
    }, 0)
    setTimeout( ()=> {
    setRoofTemplate({
      ...roofTemplate,
      step: "materials-make"
    })
    }, 700)
  }
  const upgradeToolNext = () => {
    setPrevSlideMotion('upgrade-tool')
    setTimeout( () => {
      setIsShown("selected-upgrades");
    }, 0)
    setTimeout( ()=> {
    setRoofTemplate({...roofTemplate, step: 'selected-upgrades'})
    }, 700)
}
  const selectedUpgradesPrev = () => {
    setGoingBackTo('upgrade-tool')
    setPrevSlideMotion('upgrade-tool')
    setTimeout( () => {
      setIsShown("upgrade-tool");
    }, 0)
    setTimeout( ()=> {
    setRoofTemplate({
      ...roofTemplate,
      step: "upgrade-tool"
    })
    }, 700)}
// upgrade conditionals
  const existingShingleUpgrade = () => {
    if (roofTemplate.existingShingle === "3-tab") {
      if (roofTemplate.tab === "20") {
        return (
          <ul>
            <h4>Shingle</h4>
            <li className="upgrade-li" >Supreme (25 year)
            <input
            type="checkbox"
            checked={chosenUpgrades.twentyFiveTab === true }
            onChange={(e) => setChosenUpgrades({ ...chosenUpgrades, twentyFiveTab: !chosenUpgrades.twentyFiveTab })}/>
            </li>
            <li className="upgrade-li" >Oakridge
            <input
            type="checkbox"
            checked={chosenUpgrades.oakridgeTab === true }
            onChange={(e) => setChosenUpgrades({ ...chosenUpgrades, oakridgeTab: !chosenUpgrades.oakridgeTab })}/>
            </li>
            <li className="upgrade-li" >Duration
            <input
            type="checkbox"
            checked={chosenUpgrades.durationTab === true }
            onChange={(e) => setChosenUpgrades({ ...chosenUpgrades, durationTab: !chosenUpgrades.durationTab })}/>
            </li>
            <li className="upgrade-li" >Duration Designer
            <input
            type="checkbox"
            checked={chosenUpgrades.durationDesignerTab === true }
            onChange={(e) => setChosenUpgrades({ ...chosenUpgrades, durationDesignerTab: !chosenUpgrades.durationDesignerTab })}/>
            </li>
            <li className="upgrade-li" >Berkshire
            <input
            type="checkbox"
            checked={chosenUpgrades.berkshireTab === true }
            onChange={(e) => setChosenUpgrades({ ...chosenUpgrades, berkshireTab: !chosenUpgrades.berkshireTab })}/>
            </li>
          </ul>
        )
      }
      else if (roofTemplate.tab === "25") {
        return (
          <>
          <ul>
            <h4>Shingle</h4>
          <li className="upgrade-li" >Oakridge
          <input
          type="checkbox"
          checked={chosenUpgrades.oakridgeTab === true }
          onChange={(e) => setChosenUpgrades({ ...chosenUpgrades, oakridgeTab: !chosenUpgrades.oakridgeTab })}/>
          </li>
          <li className="upgrade-li" >Duration
          <input
          type="checkbox"
          checked={chosenUpgrades.durationTab === true }
          onChange={(e) => setChosenUpgrades({ ...chosenUpgrades, durationTab: !chosenUpgrades.durationTab })}/>
          </li>
          <li className="upgrade-li" >Duration Designer
          <input
          type="checkbox"
          checked={chosenUpgrades.durationDesignerTab === true }
          onChange={(e) => setChosenUpgrades({ ...chosenUpgrades, durationDesignerTab: !chosenUpgrades.durationDesignerTab })}/>
          </li>
          <li className="upgrade-li" >Berkshire
          <input
          type="checkbox"
          checked={chosenUpgrades.berkshireTab === true }
          onChange={(e) => setChosenUpgrades({ ...chosenUpgrades, berkshireTab: !chosenUpgrades.berkshireTab })}/>
          </li>
          </ul>
          </>
        )
      }
    }
    else if (roofTemplate.existingShingle === "laminate") {
      switch (roofTemplate.laminate) {
        case "builder":
          return (
            <ul>
            <h4>Laminate</h4>
              <li className="upgrade-li" >Duration
              <input
              type="checkbox"
              checked={chosenUpgrades.durationTab === true }
              onChange={(e) => setChosenUpgrades({ ...chosenUpgrades, durationTab: !chosenUpgrades.durationTab })}/>
              </li>
              <li className="upgrade-li" >Duration Designer
              <input
              type="checkbox"
              checked={chosenUpgrades.durationDesignerTab === true }
              onChange={(e) => setChosenUpgrades({ ...chosenUpgrades, durationDesignerTab: !chosenUpgrades.durationDesignerTab })}/>
              </li>
              <li className="upgrade-li" >Berkshire
              <input
              type="checkbox"
              checked={chosenUpgrades.berkshireTab === true }
              onChange={(e) => setChosenUpgrades({ ...chosenUpgrades, berkshireTab: !chosenUpgrades.berkshireTab })}/>
              </li>

              <li className="upgrade-li" >Double Laminate<input
              type="checkbox"
              checked={chosenUpgrades.doubleLam === true }
              onChange={(e) => setChosenUpgrades({ ...chosenUpgrades, doubleLam: !chosenUpgrades.doubleLam })}/>
              </li>

              <li className="upgrade-li" >Triple Laminate<input
              type="checkbox"
              checked={chosenUpgrades.tripleLam === true }
              onChange={(e) => setChosenUpgrades({ ...chosenUpgrades, tripleLam: !chosenUpgrades.tripleLam })}/>
              </li>
            </ul>
          )
        case "high":
          return (
            <ul>
            <h4>Laminate</h4>
            <li className="upgrade-li" >Duration Designer
            <input
            type="checkbox"
            checked={chosenUpgrades.durationDesignerTab === true }
            onChange={(e) => setChosenUpgrades({ ...chosenUpgrades, durationDesignerTab: !chosenUpgrades.durationDesignerTab })}/>
            </li>
            <li className="upgrade-li" >Berkshire
            <input
            type="checkbox"
            checked={chosenUpgrades.berkshireTab === true }
            onChange={(e) => setChosenUpgrades({ ...chosenUpgrades, berkshireTab: !chosenUpgrades.berkshireTab })}/>
            </li>

            <li className="upgrade-li" >Double Laminate<input
            type="checkbox"
            checked={chosenUpgrades.doubleLam === true }
            onChange={(e) => setChosenUpgrades({ ...chosenUpgrades, doubleLam: !chosenUpgrades.doubleLam })}/>
            </li>

            <li className="upgrade-li" >Triple Laminate<input
            type="checkbox"
            checked={chosenUpgrades.tripleLam === true }
            onChange={(e) => setChosenUpgrades({ ...chosenUpgrades, tripleLam: !chosenUpgrades.tripleLam })}/>
            </li>
            </ul>
          )
        case "designer":
          return (
            <ul>
            <h4>Laminate</h4>
            <li className="upgrade-li" >Berkshire
            <input
            type="checkbox"
            checked={chosenUpgrades.berkshireTab === true }
            onChange={(e) => setChosenUpgrades({ ...chosenUpgrades, berkshireTab: !chosenUpgrades.berkshireTab })}/>
            </li>

            <li className="upgrade-li" >Double Laminate<input
            type="checkbox"
            checked={chosenUpgrades.doubleLam === true }
            onChange={(e) => setChosenUpgrades({ ...chosenUpgrades, doubleLam: !chosenUpgrades.doubleLam })}/>
            </li>

            <li className="upgrade-li" >Triple Laminate<input
            type="checkbox"
            checked={chosenUpgrades.tripleLam === true }
            onChange={(e) => setChosenUpgrades({ ...chosenUpgrades, tripleLam: !chosenUpgrades.tripleLam })}/>
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
            <h4>Drip Rake and Gutter Apron</h4>
            <li className="upgrade-li" >Drip Eaves
            <input
            type="checkbox"
            checked={chosenUpgrades.dripEaves === true }
            onChange={(e) => setChosenUpgrades({ ...chosenUpgrades, dripEaves: !chosenUpgrades.dripEaves })}/>
            </li>

            <li className="upgrade-li" >Drip Rakes
            <input
            type="checkbox"
            checked={chosenUpgrades.dripRakes === true }
            onChange={(e) => setChosenUpgrades({ ...chosenUpgrades, dripRakes: !chosenUpgrades.dripRakes })}/>
            </li>

            <li className="upgrade-li" >Gutter Apron Eaves
            <input
            type="checkbox"
            checked={chosenUpgrades.gutterEaves === true }
            onChange={(e) => setChosenUpgrades({ ...chosenUpgrades, gutterEaves: !chosenUpgrades.gutterEaves })}/>
            </li>
          </ul>
        )
      }
      if (!roofTemplate.dripEaves && !roofTemplate.apronEaves) {
        return (
          <ul>
            <h4>Drip Rake and Gutter Apron</h4>
            <li className="upgrade-li" >Drip Eaves
            <input
            type="checkbox"
            checked={chosenUpgrades.dripEaves === true }
            onChange={(e) => setChosenUpgrades({ ...chosenUpgrades, dripEaves: !chosenUpgrades.dripEaves })}/>
            </li>

            <li className="upgrade-li" >Gutter Apron Eaves
            <input
            type="checkbox"
            checked={chosenUpgrades.gutterEaves === true }
            onChange={(e) => setChosenUpgrades({ ...chosenUpgrades, gutterEaves: !chosenUpgrades.gutterEaves })}/>
            </li>
          </ul>        )
      }
      if (!roofTemplate.dripEaves && !roofTemplate.dripRakes) {
        return (
          <ul>
            <h4>Drip Rake and Gutter Apron</h4>
            <li className="upgrade-li" >Drip Eaves
            <input
            type="checkbox"
            checked={chosenUpgrades.dripEaves === true }
            onChange={(e) => setChosenUpgrades({ ...chosenUpgrades, dripEaves: !chosenUpgrades.dripEaves })}/>
            </li>

            <li className="upgrade-li" >Drip Rakes
            <input
            type="checkbox"
            checked={chosenUpgrades.dripRakes === true }
            onChange={(e) => setChosenUpgrades({ ...chosenUpgrades, dripRakes: !chosenUpgrades.dripRakes })}/>
            </li>
          </ul>
        )
      }
      if (!roofTemplate.apronEaves && !roofTemplate.dripRakes) {
        return (
          <ul>
            <h4>Drip Rake and Gutter Apron</h4>

            <li className="upgrade-li" >Drip Rakes
            <input
            type="checkbox"
            checked={chosenUpgrades.dripRakes === true }
            onChange={(e) => setChosenUpgrades({ ...chosenUpgrades, dripRakes: !chosenUpgrades.dripRakes })}/>
            </li>

            <li className="upgrade-li" >Gutter Apron Eaves
            <input
            type="checkbox"
            checked={chosenUpgrades.gutterEaves === true }
            onChange={(e) => setChosenUpgrades({ ...chosenUpgrades, gutterEaves: !chosenUpgrades.gutterEaves })}/>
            </li>
          </ul>
        )
      }
      if (!roofTemplate.dripEaves) {
        return (
          <ul>
            <h4>Drip Rake and Gutter Apron</h4>
            <li className="upgrade-li" >Drip Eaves
            <input
            type="checkbox"
            checked={chosenUpgrades.dripEaves === true }
            onChange={(e) => setChosenUpgrades({ ...chosenUpgrades, dripEaves: !chosenUpgrades.dripEaves })}/>
            </li>

          </ul>
        )
      }
      if (!roofTemplate.dripRakes) {
        return (
          <ul>
            <h4>Drip Rake and Gutter Apron</h4>

            <li className="upgrade-li" >Drip Rakes
            <input
            type="checkbox"
            checked={chosenUpgrades.dripRakes === true }
            onChange={(e) => setChosenUpgrades({ ...chosenUpgrades, dripRakes: !chosenUpgrades.dripRakes })}/>
            </li>
          </ul>
        )
      }
      if (!roofTemplate.apronEaves) {
        return (
          <ul>
            <h4>Drip Rake and Gutter Apron</h4>
            <li className="upgrade-li" >Gutter Apron Eaves
            <input
            type="checkbox"
            checked={chosenUpgrades.gutterEaves === true }
            onChange={(e) => setChosenUpgrades({ ...chosenUpgrades, gutterEaves: !chosenUpgrades.gutterEaves })}/>
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
            <h4>Valley Metal</h4>

            <li className="upgrade-li" >"W"
            <input
            type="checkbox"
            checked={chosenUpgrades.valleyMetalW === true }
            onChange={(e) => setChosenUpgrades({ ...chosenUpgrades, valleyMetalW: !chosenUpgrades.valleyMetalW })}/>
            </li>

          </ul>
        )
      }
      else if (roofTemplate.valleyMetalW) {
        return (
          <>
          <ul>
          <h4>Valley Metal</h4>
            <li className="upgrade-li" >{!roofTemplate.wPainter &&
              <>
              Painter
              <input
              type="checkbox"
              checked={chosenUpgrades.valleyMetalPainted === true }
              onChange={(e) => setChosenUpgrades({ ...chosenUpgrades, valleyMetalPainted: !chosenUpgrades.valleyMetalPainted })}/>
              </>
            }</li>
            <li className="upgrade-li" >{!roofTemplate.wGalvanized &&
              <>
              Galvanized
              <input
              type="checkbox"
              checked={chosenUpgrades.valleyMetalGalvanized === true }
              onChange={(e) => setChosenUpgrades({ ...chosenUpgrades, valleyMetalGalvanized: !chosenUpgrades.valleyMetalGalvanized })}/>
              </>
            }</li>
            <li className="upgrade-li" >{!roofTemplate.wCopper &&
              <>
              Copper
              <input
              type="checkbox"
              checked={chosenUpgrades.valleyMetalCopper === true }
              onChange={(e) => setChosenUpgrades({ ...chosenUpgrades, valleyMetalCopper: !chosenUpgrades.valleyMetalCopper })}/>
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
        <h4>Underlayment</h4>
        <li className="upgrade-li" >
          Synthetic
          <input
          type="checkbox"
          checked={chosenUpgrades.synth === true }
          onChange={(e) => setChosenUpgrades({ ...chosenUpgrades, synth: !chosenUpgrades.synth })}/>
        </li>

      </ul>
    )
  }
  const syntheticUpgrade = () => {
    switch (roofTemplate.synthetic) {
      case "builder":
      return (
      <ul>
      <h4>Synthetic Underlayment</h4>

        <li className="upgrade-li" >Better Grade<input
        type="checkbox"
        checked={chosenUpgrades.betterSynth === true }
        onChange={(e) => setChosenUpgrades({ ...chosenUpgrades, betterSynth: !chosenUpgrades.betterSynth })}/>
        </li>

        <li className="upgrade-li" >Best Grade<input
        type="checkbox"
        checked={chosenUpgrades.bestSynth === true }
        onChange={(e) => setChosenUpgrades({ ...chosenUpgrades, bestSynth: !chosenUpgrades.bestSynth })}/>
        </li>
      </ul>
    )
      case "better":
      return (
      <ul>
      <h4>Synthetic Underlayment</h4>
        <li className="upgrade-li" >Best Grade<input
        type="checkbox"
        checked={chosenUpgrades.bestSynth === true }
        onChange={(e) => setChosenUpgrades({ ...chosenUpgrades, bestSynth: !chosenUpgrades.bestSynth })}/>
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
      <h4>Ridge Cap</h4>

        <li className="upgrade-li" >Standard Profile<input
        type="checkbox"
        checked={chosenUpgrades.standardRidge === true }
        onChange={(e) => setChosenUpgrades({ ...chosenUpgrades, standardRidge: !chosenUpgrades.standardRidge })}/>
        </li>

        <li className="upgrade-li" >High Profile<input
        type="checkbox"
        checked={chosenUpgrades.highRidge === true }
        onChange={(e) => setChosenUpgrades({ ...chosenUpgrades, highRidge: !chosenUpgrades.highRidge })}/>
        </li>
      </ul>
    )
  }
    else if (roofTemplate.standard) {
      return (
        <ul>
        <h4>Ridge Cap</h4>

          <li className="upgrade-li" >High Profile<input
          type="checkbox"
          checked={chosenUpgrades.highRidge === true }
          onChange={(e) => setChosenUpgrades({ ...chosenUpgrades, highRidge: !chosenUpgrades.highRidge })}/>
          </li>
        </ul>
      )
    }
  }
  const stepUpgrade = () => {
    if (roofTemplate.stepAluminum) {
      return (
      <ul>
      <h4>Step Flashing</h4>
        <li className="upgrade-li" >Copper<input
        type="checkbox"
        checked={chosenUpgrades.sFCopper === true }
        onChange={(e) => setChosenUpgrades({ ...chosenUpgrades, sFCopper: !chosenUpgrades.sFCopper })}/>
        </li>
        <li className="upgrade-li" >Galvanized<input
        type="checkbox"
        checked={chosenUpgrades.sFGalvan === true }
        onChange={(e) => setChosenUpgrades({ ...chosenUpgrades, sFGalvan: !chosenUpgrades.sFGalvan })}/>
        </li>
      </ul>
      )
    }
    else if (roofTemplate.stepCopper) {
      return (
      <ul>
      <h4>Step Flashing</h4>

        <li className="upgrade-li" >Galvanized<input
        type="checkbox"
        checked={chosenUpgrades.sFGalvan === true }
        onChange={(e) => setChosenUpgrades({ ...chosenUpgrades, sFGalvan: !chosenUpgrades.sFGalvan })}/>
        </li>
      </ul>
      )
    }
  }
  const counterUpgrade = () => {
    if (roofTemplate.counterAluminum) {
      return (
      <ul>
      <h4>Counter Flashing</h4>
        <li className="upgrade-li" >Copper<input
        type="checkbox"
        checked={chosenUpgrades.cFCopper === true }
        onChange={(e) => setChosenUpgrades({ ...chosenUpgrades, cFCopper: !chosenUpgrades.cFCopper })}/>
        </li>
        <li className="upgrade-li" >Painted Metal<input
        type="checkbox"
        checked={chosenUpgrades.cFPainted === true }
        onChange={(e) => setChosenUpgrades({ ...chosenUpgrades, cFPainted: !chosenUpgrades.cFPainted })}/>
        </li>
      </ul>
      )
    }
    else if (roofTemplate.counterCopper) {
      return (
      <ul>
      <h4>Counter Flashing</h4>

        <li className="upgrade-li" >Painted Metal<input
        type="checkbox"
        checked={chosenUpgrades.cFPainted === true }
        onChange={(e) => setChosenUpgrades({ ...chosenUpgrades, cFPainted: !chosenUpgrades.cFPainted })}/>
        </li>
      </ul>
      )
    }
  }
  const chimneyUpgrade = () => {
    if (roofTemplate.chimneyAluminum) {
      return (
      <ul>
      <h4>Chimney Flashing</h4>
        <li className="upgrade-li" >Copper<input
        type="checkbox"
        checked={chosenUpgrades.chFCopper === true }
        onChange={(e) => setChosenUpgrades({ ...chosenUpgrades, chFCopper: !chosenUpgrades.chFCopper })}/>
        </li>
        <li className="upgrade-li" >Lead<input
        type="checkbox"
        checked={chosenUpgrades.chFLead === true }
        onChange={(e) => setChosenUpgrades({ ...chosenUpgrades, chFLead: !chosenUpgrades.chFLead })}/>
        </li>
        <li className="upgrade-li" >Painted Metal<input
        type="checkbox"
        checked={chosenUpgrades.chFPainted === true }
        onChange={(e) => setChosenUpgrades({ ...chosenUpgrades, chFPainted: !chosenUpgrades.chFPainted })}/>
        </li>
      </ul>
      )
    }
    else if (roofTemplate.chimneyCopper) {
      return (
      <ul>
      <h4>Chimney Flashing</h4>

        <li className="upgrade-li" >Lead<input
        type="checkbox"
        checked={chosenUpgrades.chFLead === true }
        onChange={(e) => setChosenUpgrades({ ...chosenUpgrades, chFLead: !chosenUpgrades.chFLead })}/>
        </li>
        <li className="upgrade-li" >Painted Metal<input
        type="checkbox"
        checked={chosenUpgrades.chFPainted === true }
        onChange={(e) => setChosenUpgrades({ ...chosenUpgrades, chFPainted: !chosenUpgrades.chFPainted })}/>
        </li>
      </ul>
      )
    }
    else if (roofTemplate.chimneyLead) {
      return (
      <ul>
      <h4>Chimney Flashing</h4>

        <li className="upgrade-li" >Painted Metal<input
        type="checkbox"
        checked={chosenUpgrades.chFPainted === true }
        onChange={(e) => setChosenUpgrades({ ...chosenUpgrades, chFPainted: !chosenUpgrades.chFPainted })}/>
        </li>
      </ul>
      )
    }
  }

  const selectedUpgrades = () => {
    let keys = Object.keys(chosenUpgrades);
    console.log(chosenUpgrades)
    // returns keys of chosen upgrades in array
    let data = keys.filter((i) => chosenUpgrades[i] === true)

    // returns each item's name and price
    let namesAndPrices = [];
    const getNameAndPrice = (upgrade) => {
      namesAndPrices.push({ name: upgradeObjects[upgrade].name, price: upgradeObjects[upgrade].price})
      return (upgradeObjects[upgrade].name + ' ' + upgradeObjects[upgrade].price)
    };
    data.forEach(getNameAndPrice);
    return namesAndPrices.map((item, index) => {
      return (
        <tr key={index}>
          <td className="selected-name-row">{item.name}</td>
          <td>{item.price}</td>
        </tr>
      )
    })
  }

const [isShown, setIsShown] = useState('0')
// const [key, setKey] = useState(1)

    const _switchRender = () => {
      switch (roofTemplate.step) {
    default:
    case "0":

      return (
        <>
        <div className="question-container">
        <AnimatePresence>
        { (isShown === '0') && (
          <motion.div
          key={"0"}
          initial={{x:  (prevSlideMotion==='0') ? "0" : "0", opacity: 0 }}
          animate={{x:0, opacity:1}}
          exit={{x:"0", opacity:0}}
          transition={{ duration: .7 }}
          >

        <StepZero roofTemplate={roofTemplate} setRoofTemplate={setRoofTemplate}/>
        </motion.div>
      )}
      </AnimatePresence>

        <div className="surv-accent1"></div>
        </div>
        <button className="survey-btn next" onClick={() => zeroNext()}><i class="fas fa-chevron-right"></i></button>
        </>
      )
    case "1":

        return (
          <>
          <div className="question-container">
          <AnimatePresence>
          { (isShown === '1') && (
            <motion.div
            key={"1"}
            initial={{x: (prevSlideMotion==='1') ? "0" : "0", opacity: 0}}
            animate={{x:0, opacity:1}}
            exit={{x: prevSlideMotion==="0" ? "0" : "0", opacity:0}}
            transition={{ duration: .7 }}
            >
          <StepOne roofTemplate={roofTemplate} handleMeasurementChange={handleMeasurementChange}/>
          </motion.div>
        )}
        </AnimatePresence>
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
          <AnimatePresence>
          { (isShown === 'manual') && (
            <motion.div
            key={"1"}
            initial={{x: (prevSlideMotion==='manual') ? "0" : "0", opacity: 0}}
            animate={{x:0, opacity:1}}
            exit={{x: prevSlideMotion==="1" ? "0" : "0", opacity:0}}
            transition={{ duration: .7 }}
            >
          <h1 className="surv-header">Manual Entry</h1>
          <div className="tall-form-group">
            <div className="manual-form">
              <div className="hz-surv">
                <div className="manual-label">
                  <label className="total manual-label-width">Total Roof Area <span style={{ fontSize: '12px' }}>(SF)</span></label>
                  <input
                  type="tel"
                  className="man-entry"
                  value={roofTemplate.roofTotal}
                  onChange={ (e) => setRoofTemplate({ ...roofTemplate, roofTotal: e.target.value }) }

                  />


                  <label className="ridge manual-label-width">Ridge <span style={{ fontSize: '12px' }}>(LF)</span></label>
                  <input
                  type="tel"
                  className="man-entry"
                  value={roofTemplate.ridge}
                  onChange={(e) => setRoofTemplate({ ...roofTemplate, ridge: e.target.value })}

                  />

                  <label className="hip manual-label-width">Hip <span style={{ fontSize: '12px' }}>(LF)</span></label>
                  <input
                  type="tel"
                  className="man-entry"
                  value={roofTemplate.hip}
                  onChange={(e) => setRoofTemplate({ ...roofTemplate, hip: e.target.value })}

                  />
              </div>
              </div>
            </div>
            <div className="manual-form">
              <div className="hz-surv">
                <div className="manual-label">
                  <label className="valley manual-label-width">Valley <span style={{ fontSize: '12px' }}>(LF)</span></label>
                  <input
                  type="tel"
                  className="man-entry"
                  value={roofTemplate.valley}
                  onChange={(e) => setRoofTemplate({ ...roofTemplate, valley: e.target.value })}

                  />

                  <label className="rake manual-label-width">Rake <span style={{ fontSize: '12px' }}>(LF)</span></label>
                  <input
                  type="tel"
                  className="man-entry"
                  value={roofTemplate.rake}
                  onChange={(e) => setRoofTemplate({ ...roofTemplate, rake: e.target.value })}

                  />

                  <label className="eave manual-label-width">Eave <span style={{ fontSize: '12px' }}>(LF)</span></label>
                  <input
                  type="tel"
                  className="man-entry"
                  value={roofTemplate.eave}
                  onChange={(e) => setRoofTemplate({ ...roofTemplate, eave: e.target.value })}

                  />
                </div>
              </div>
            </div>
            <div className="manual-form">
              <div className="hz-surv">
                <div className="manual-label">
                   <label className="flashing manual-label-width">Counter Flashing <span style={{ fontSize: '12px' }}>(LF)</span></label>
                  <input
                  type="tel"
                  className="man-entry"
                  value={roofTemplate.counterFlashing}
                  onChange={(e) => setRoofTemplate({ ...roofTemplate, counterFlashing: e.target.value })}

                  />

                  <label className="flashing manual-label-width">Step Flashing <span style={{ fontSize: '12px' }}>(LF)</span></label>
                  <input
                  type="tel"
                  className="man-entry"
                  value={roofTemplate.stepFlashing}
                  onChange={(e) => setRoofTemplate({ ...roofTemplate, stepFlashing: e.target.value })}

                  />

                  <label className="parapets manual-label-width">Parapets <span style={{ fontSize: '12px' }}>(LF)</span></label>
                  <input
                  type="tel"
                  className="man-entry man-bot"
                  value={roofTemplate.parapets}
                  onChange={(e) => setRoofTemplate({ ...roofTemplate, parapets: e.target.value })}

                  />
              </div>
            </div>
          </div>

          </div>
          </motion.div>
        )}
          </AnimatePresence>
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
            <AnimatePresence>
            { (isShown === 'roofType') && (
              <motion.div
              key={"1"}
              initial={{x: (prevSlideMotion==='roofType') ? "0" : "0", opacity: 0}}
              animate={{x:0, opacity:1}}
              exit={{x: prevSlideMotion==="manual" ? "0" : "0", opacity:0}}
              transition={{ duration: .7 }}
              >
            <h1 className="surv-header">What type of material is existing on the roof?</h1>
            <div className="form-group">
            <label>Existing Roof Material</label>
            <select
            name="roof_type"
            id="roof_type"
            size="1"
            value={roofTemplate.roofType}
            onChange={(e) => setRoofTemplate({ ...roofTemplate, roofType: e.target.value })}>>
            <option value="select">Select type</option>
            <option value="asphalt">Asphalt Shingle</option>
            {
              // FUTURE OPTIONS
            // <option value="copper">Copper</option>
            // <option value="metal">Metal</option>
            // <option value="synthetic">Synthetic</option>
            // <option value="tile">Tile</option>
            // <option value="wood">Wood</option>
            }
            </select>
            </div>
            </motion.div>
          )}
            </AnimatePresence>
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
              <AnimatePresence>
              { (isShown === 'asphalt') && (
                <motion.div
                key={"1"}
                initial={{x: (prevSlideMotion==='asphalt') ? "0" : "0", opacity: 0}}
                animate={{x:0, opacity:1}}
                exit={{x: prevSlideMotion==="roofType" ? "0" : "0", opacity:0}}
                transition={{ duration: .7 }}
                >
              <h1 className="surv-header">What kind of shingle is existing on the roof?</h1>
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
              </motion.div>
            )}
              </AnimatePresence>
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
            <AnimatePresence>
            { (isShown === 'metal') && (
              <motion.div
              key={"1"}
              initial={{x: (prevSlideMotion==='metal') ? "0" : "0", opacity: 0}}
              animate={{x:0, opacity:1}}
              exit={{x: prevSlideMotion==="roofType" ? "0" : "0", opacity:0}}
              transition={{ duration: .7 }}
              >
            <h1 className="surv-header">Is a drip edge or gutter apron existing on the roof?</h1>
            <div className="form-group">
              <label>Yes</label>
              <input
              style={{ width:"20px", height: "20px" }}
              type="radio"
              checked={roofTemplate.metalEdge === true }
              onChange={(e) => setRoofTemplate({ ...roofTemplate, metalEdge: !roofTemplate.metalEdge })}
              />
              <label>No</label>
              <input
              style={{ width:"20px", height: "20px" }}
              type="radio"
              checked={roofTemplate.metalEdge === false }
              onChange={(e) => setRoofTemplate({ ...roofTemplate, metalEdge: !roofTemplate.metalEdge })}
              />
            </div>
            </motion.div>
          )}
            </AnimatePresence>
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
            <AnimatePresence>
            { (isShown === '3-tab') && (
              <motion.div
              key={"1"}
              initial={{x: (prevSlideMotion==='3-tab') ? "0" : "0", opacity: 0}}
              animate={{x:0, opacity:1}}
              exit={{x: prevSlideMotion==="asphalt" ? "0" : "0", opacity:0}}
              transition={{ duration: .7 }}
              >
            <h1 className="surv-header">Which 3-Tab is existing on the roof?</h1>
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
                </select>
            </div>
            </motion.div>
          )}
            </AnimatePresence>
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
            <AnimatePresence>
            { (isShown === 'laminate') && (
              <motion.div
              key={"1"}
              initial={{x: (prevSlideMotion==='laminate') ? "0" : "0", opacity: 0}}
              animate={{x:0, opacity:1}}
              exit={{x: prevSlideMotion==="asphalt" ? "0" : "0", opacity:0}}
              transition={{ duration: .7 }}
              >
            <h1 className="surv-header">Which grade of laminate is existing on the roof?</h1>
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
                <option value="designer">Designer Grade</option>
                <option value="specialty">Specialty Grade</option>
                </select>
            </div>
            </motion.div>
          )}
            </AnimatePresence>
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
          <AnimatePresence>
          { (isShown === 'bol-valley-metal') && (
            <motion.div
            key={"1"}
            initial={{x: (prevSlideMotion==='bol-valley-metal') ? "0" : "0", opacity: 0}}
            animate={{x:0, opacity:1}}
            exit={{x: prevSlideMotion==="roofType" ? "0" : "0", opacity:0}}
            transition={{ duration: .7 }}
            >
          <h1 className="surv-header">Valley Metal</h1>
          <div className="form-group">
            <label>Yes</label>
            <input
            style={{ width:"20px", height: "20px" }}
            type="radio"
            checked={roofTemplate.valleyMetal === true }
            onChange={(e) => setRoofTemplate({ ...roofTemplate, valleyMetal: !roofTemplate.valleyMetal })}
            />
            <label>No</label>
            <input
            style={{ width:"20px", height: "20px" }}
            type="radio"
            checked={roofTemplate.valleyMetal === false }
            onChange={(e) => setRoofTemplate({ ...roofTemplate, valleyMetal: !roofTemplate.valleyMetal })}
            />
          </div>
          </motion.div>
        )}
          </AnimatePresence>
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
          <AnimatePresence>
          { (isShown === 'underlayment') && (
            <motion.div
            key={"1"}
            initial={{x: (prevSlideMotion==='underlayment') ? "0" : "0", opacity: 0}}
            animate={{x:0, opacity:1}}
            exit={{x: prevSlideMotion==="roofType" ? "0" : "0", opacity:0}}
            transition={{ duration: .7 }}
            >
            <h1 className="surv-header">Which type of underlayment is existing on the roof?</h1>
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
            </motion.div>
          )}
            </AnimatePresence>
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
            style={{ width:"20px", height: "20px" }}
            type="checkbox"
            checked={roofTemplate.valleyMetalRolled === true }
            onChange={(e) => setRoofTemplate({ ...roofTemplate, valleyMetalRolled: !roofTemplate.valleyMetalRolled })}
            />
            <label>"W"</label>
            <input
            style={{ width:"20px", height: "20px" }}
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
            style={{ width:"20px", height: "20px" }}
            type="checkbox"
            checked={roofTemplate.wPainter === true }
            onChange={(e) => setRoofTemplate({ ...roofTemplate, wPainter: !roofTemplate.wPainter })}
            />
            <label>Galvanized</label>
            <input
            style={{ width:"20px", height: "20px" }}
            type="checkbox"
            checked={roofTemplate.wGalvanized === true }
            onChange={(e) => setRoofTemplate({ ...roofTemplate, wGalvanized: !roofTemplate.wGalvanized })}
            />
            <label>Copper</label>
            <input
            style={{ width:"20px", height: "20px" }}
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
            <AnimatePresence>
            { (isShown === 'ice-water-bool') && (
              <motion.div
              key={"1"}
              initial={{x: (prevSlideMotion==='ice-water-bool') ? "0" : "0", opacity: 0}}
              animate={{x:0, opacity:1}}
              exit={{x: prevSlideMotion==="roofType" ? "0" : "0", opacity:0}}
              transition={{ duration: .7 }}
              >
            <h1 className="surv-header">Is there an ice and water barrier existing on the roof?</h1>
            <div className="form-group">
              <label>Yes</label>
              <input
              style={{ width:"20px", height: "20px" }}
              type="radio"
              checked={roofTemplate.iceBool=== true }
              onChange={(e) => setRoofTemplate({ ...roofTemplate, iceBool: !roofTemplate.iceBool })}
              />
              <label>No</label>
              <input
              style={{ width:"20px", height: "20px" }}
              type="radio"
              checked={roofTemplate.iceBool=== false }
              onChange={(e) => setRoofTemplate({ ...roofTemplate, iceBool: !roofTemplate.iceBool })}
              />
            </div>
            </motion.div>
          )}
            </AnimatePresence>
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
            <AnimatePresence>
            { (isShown === 'synthetic') && (
              <motion.div
              key={"1"}
              initial={{x: (prevSlideMotion==='synthetic') ? "0" : "0", opacity: 0}}
              animate={{x:0, opacity:1}}
              exit={{x: prevSlideMotion==="roofType" ? "0" : "0", opacity:0}}
              transition={{ duration: .7 }}
              >
              <h1 className="surv-header">Which grade of synthetic underlayment is existing on the roof?</h1>
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
              </motion.div>
            )}
              </AnimatePresence>
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
        <AnimatePresence>
        { (isShown === 'pipejacks') && (
          <motion.div
          key={"1"}
          initial={{x: (prevSlideMotion==='pipejacks') ? "0" : "0", opacity: 0}}
          animate={{x:0, opacity:1}}
          exit={{x: prevSlideMotion==="roofType" ? "0" : "0", opacity:0}}
          transition={{ duration: .7 }}
          >
        <h1 className="surv-header">What type of pipejacks are currently on the roof?</h1>
        <h1 className="surv-header">If present, how many?</h1>
        <div className="form-group">
        <label>Neoprene/Hard Plastics</label>
        <input
        className="neoprene-placeholder"
        style={{ width:"110px", height: "35px" }}
        type="tel"
        placeholder="enter a number"
        value={roofTemplate.pipeJacksNeo}
        onChange={(e) => setRoofTemplate({ ...roofTemplate, pipeJacksNeo: e.target.value })}
        />
        <label>Other</label>
        <input
        className="neoprene-placeholder"
        style={{ width:"110px", height: "35px" }}
        type="tel"
        placeholder="enter a number"
        value={roofTemplate.pipeJacksOther}
        onChange={ (e) => setRoofTemplate({ ...roofTemplate, pipeJacksOther: e.target.value }) }
        />
        </div>
        </motion.div>
      )}
        </AnimatePresence>
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
            <AnimatePresence>
            { (isShown === 'neoprene') && (
              <motion.div
              key={"1"}
              initial={{x: (prevSlideMotion==='neoprene') ? "0" : "0", opacity: 0}}
              animate={{x:0, opacity:1}}
              exit={{x: prevSlideMotion==="roofType" ? "0" : "0", opacity:0}}
              transition={{ duration: .7 }}
              >
              <h1 className="surv-header">Neoprene/Hard Plastic</h1>
              <Container fluid="md" >
                <Row>
                <Col md={8} className="neoprene">
                <label>1"</label>
                <input
                type="text"
                value={roofTemplate.neo1}
                onChange={(e) => setRoofTemplate({ ...roofTemplate, neo1: e.target.value })}
                />

                <label>1 1/2"</label>
                <input
                type="text"
                value={roofTemplate.neo15}
                onChange={(e) => setRoofTemplate({ ...roofTemplate, neo15: e.target.value })}
                />
                </Col>
                </Row>
                <Row>
                <Col md={8} className="neoprene">
                <label>2"</label>
                <input
                type="text"
                value={roofTemplate.neo2}
                onChange={(e) => setRoofTemplate({ ...roofTemplate, neo2: e.target.value })}
                />
                </Col>
                <Col md={8}  className="neoprene">
                <label>2 1/2"</label>
                <input
                type="text"
                value={roofTemplate.neo25}
                onChange={(e) => setRoofTemplate({ ...roofTemplate, neo25: e.target.value })}
                />
                </Col>
                </Row>
                <Row>
                <Col md={8} className="neoprene">
                <label>3"</label>
                <input
                type="text"
                value={roofTemplate.neo3}
                onChange={(e) => setRoofTemplate({ ...roofTemplate, neo3: e.target.value })}
                />
                </Col>
                <Col md={8} className="neoprene">
                <label>4"</label>
                <input
                type="text"
                value={roofTemplate.neo4}
                onChange={(e) => setRoofTemplate({ ...roofTemplate, neo4: e.target.value })}
                />
                </Col>
                <Col md={8} className="neoprene">
                <label>6"</label>
                <input
                type="text"
                value={roofTemplate.neo6}
                onChange={(e) => setRoofTemplate({ ...roofTemplate, neo6: e.target.value })}
                />
                </Col>
                </Row>
              </Container>
              </motion.div>
            )}
              </AnimatePresence>
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
            <AnimatePresence>
            { (isShown === 'ice-water') && (
              <motion.div
              key={"1"}
              initial={{x: (prevSlideMotion==='ice-water') ? "0" : "0", opacity: 0}}
              animate={{x:0, opacity:1}}
              exit={{x: prevSlideMotion==="roofType" ? "0" : "0", opacity:0}}
              transition={{ duration: .7 }}
              >
            <h1 className="surv-header">Where is the ice and water barrier existing on the roof?</h1>

            <div className="ice-water-inputs form-group">
              <label>Eaves</label>
              <input
              style={{ width:"20px", height: "20px" }}
              type="checkbox"
              checked={roofTemplate.iceEaves === true }
              onChange={(e) => setRoofTemplate({ ...roofTemplate, iceEaves: !roofTemplate.iceEaves })}
              />
              <label>Rakes</label>
              <input
              style={{ width:"20px", height: "20px" }}
              type="checkbox"
              checked={roofTemplate.iceRakes === true }
              onChange={(e) => setRoofTemplate({ ...roofTemplate, iceRakes: !roofTemplate.iceRakes })}
              />
              <label>Valleys</label>
              <input
              style={{ width:"20px", height: "20px" }}
              type="checkbox"
              checked={roofTemplate.iceValleys === true }
              onChange={(e) => setRoofTemplate({ ...roofTemplate, iceValleys: !roofTemplate.iceValleys })}
              />
              <label>Low Scope</label>
              <input
              style={{ width:"20px", height: "20px" }}
              type="checkbox"
              checked={roofTemplate.iceLow === true }
              onChange={(e) => setRoofTemplate({ ...roofTemplate, iceLow: !roofTemplate.iceLow })}
              />
              <label>Entire Roof</label>
              <input
              style={{ width:"20px", height: "20px" }}
              type="checkbox"
              checked={roofTemplate.iceEntire === true }
              onChange={(e) => setRoofTemplate({ ...roofTemplate, iceEntire: !roofTemplate.iceEntire })}
              />

            </div>
            </motion.div>
          )}
            </AnimatePresence>
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
          <AnimatePresence>
          { (isShown === 'ridge-vent') && (
            <motion.div
            key={"1"}
            initial={{x: (prevSlideMotion==='ridge-vent') ? "0" : "0", opacity: 0}}
            animate={{x:0, opacity:1}}
            exit={{x: prevSlideMotion==="roofType" ? "0" : "0", opacity:0}}
            transition={{ duration: .7 }}
            >
          <h1 className="surv-header">Is there a ridge vent currently on the roof?</h1>
          <div className="form-group">
            <label>Yes</label>
            <input
            style={{ width:"20px", height: "20px" }}
            type="radio"
            checked={roofTemplate.ridgeVent === true }
            onChange={(e) => setRoofTemplate({ ...roofTemplate, ridgeVent: !roofTemplate.ridgeVent })}
            />
            <label>No</label>
            <input
            style={{ width:"20px", height: "20px" }}
            type="radio"
            checked={roofTemplate.ridgeVent === false }
            onChange={(e) => setRoofTemplate({ ...roofTemplate, ridgeVent: !roofTemplate.ridgeVent })}
            />
          </div>
          </motion.div>
        )}
          </AnimatePresence>
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
            <AnimatePresence>
            { (isShown === 'drip-gutter') && (
              <motion.div
              key={"1"}
              initial={{x: (prevSlideMotion==='drip-gutter') ? "0" : "0", opacity: 0}}
              animate={{x:0, opacity:1}}
              exit={{x: prevSlideMotion==="roofType" ? "0" : "0", opacity:0}}
              transition={{ duration: .7 }}
              >
            <h1 className="surv-header">Where is the drip edge/gutter apron located on the roof?</h1>
            <div className="form-group">
            <h2 className="drip-h2">Drip</h2>
              <label>Rakes</label>
              <input
              style={{ width:"20px", height: "20px" }}
              type="checkbox"
              checked={roofTemplate.dripRakes === true }
              onChange={(e) => setRoofTemplate({ ...roofTemplate, dripRakes: !roofTemplate.dripRakes })}
              />
              <label>Eaves</label>
              <input
              style={{ width:"20px", height: "20px" }}
              type="checkbox"
              checked={roofTemplate.dripEaves === true }
              onChange={(e) => setRoofTemplate({ ...roofTemplate, dripEaves: !roofTemplate.dripEaves })}
              />
            <h2 className="gutter-h2">Gutter Apron</h2>
              <label>Eaves</label>
              <input
              style={{ width:"20px", height: "20px" }}
              type="checkbox"
              checked={roofTemplate.apronEaves === true }
              onChange={(e) => setRoofTemplate({ ...roofTemplate, apronEaves: !roofTemplate.apronEaves })}
              />
            </div>
            </motion.div>
          )}
            </AnimatePresence>
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
            <AnimatePresence>
            { (isShown === 'ridge') && (
              <motion.div
              key={"1"}
              initial={{x: (prevSlideMotion==='ridge') ? "0" : "0", opacity: 0}}
              animate={{x:0, opacity:1}}
              exit={{x: prevSlideMotion==="roofType" ? "0" : "0", opacity:0}}
              transition={{ duration: .7 }}
              >
              <h1 className="surv-header">What types of ridge cap are existing on the roof?</h1>
              <div className="form-group">
                <label>3-Tab</label>
                <input
                style={{ width:"20px", height: "20px" }}
                type="checkbox"
                checked={roofTemplate.tab3 === true }
                onChange={(e) => setRoofTemplate({ ...roofTemplate, tab3: !roofTemplate.tab3 })}
                />
                <label>Standard Profile</label>
                <input
                style={{ width:"20px", height: "20px" }}
                type="checkbox"
                checked={roofTemplate.standard === true }
                onChange={(e) => setRoofTemplate({ ...roofTemplate, standard: !roofTemplate.standard })}
                />
                <label>High Profile</label>
                <input
                style={{ width:"20px", height: "20px" }}
                type="checkbox"
                checked={roofTemplate.highProf === true }
                onChange={(e) => setRoofTemplate({ ...roofTemplate, highProf: !roofTemplate.highProf })}
                />

              </div>
              </motion.div>
            )}
              </AnimatePresence>
              <div className="surv-accent1"></div>

              </div>
              <button className="survey-btn prev" onClick={() => ridgePrev()}><i class="fas fa-chevron-left"></i></button>
              <button className="survey-btn next" onClick={() => ridgeNext()}><i class="fas fa-chevron-right"></i></button>

            </>
          )
    case "bol-step":
          return (
            <>
            <div className="question-container">
            <AnimatePresence>
            { (isShown === 'bol-step') && (
              <motion.div
              key={"1"}
              initial={{x: (prevSlideMotion==='bol-step') ? "0" : "0", opacity: 0}}
              animate={{x:0, opacity:1}}
              exit={{x: prevSlideMotion==="roofType" ? "0" : "0", opacity:0}}
              transition={{ duration: .7 }}
              >
            <h1 className="surv-header">Is step flashing existing on the roof?</h1>

            <div className="flashing-inputs form-group">
            <label>Yes</label>
            <input
            style={{ width:"20px", height: "20px" }}
            type="checkbox"
            checked={roofTemplate.bolStep === true }
            onChange={(e) => {
              if(roofTemplate.bolStep === ' ') {
                setRoofTemplate({ ...roofTemplate, bolStep: true })
              } else {
                setRoofTemplate({ ...roofTemplate, bolStep: !roofTemplate.bolStep })
              }
            }}
            />
            <label>No</label>
            <input
            style={{ width:"20px", height: "20px" }}
            type="checkbox"
            checked={roofTemplate.bolStep === false }
            onChange={(e) => {
              if(roofTemplate.bolStep === ' ') {
                setRoofTemplate({ ...roofTemplate, bolStep: false })
              } else {
                setRoofTemplate({ ...roofTemplate, bolStep: !roofTemplate.bolStep })
              }
            }}            />
            </div>
            </motion.div>
          )}
            </AnimatePresence>
            <div className="surv-accent1"></div>

            </div>
            <button className="survey-btn prev" onClick={() => bolStepPrev()}><i class="fas fa-chevron-left"></i></button>
            <button className="survey-btn next" onClick={() => bolStepNext()}><i class="fas fa-chevron-right"></i></button>

            </>
          )
    case 'step-flashing':
          return (
            <>
            <div className="question-container">
            <AnimatePresence>
            { (isShown === 'step-flashing') && (
              <motion.div
              key={"1"}
              initial={{x: (prevSlideMotion==='step-flashing') ? "0" : "0", opacity: 0}}
              animate={{x:0, opacity:1}}
              exit={{x: prevSlideMotion==="roofType" ? "0" : "0", opacity:0}}
              transition={{ duration: .7 }}
              >
            <h1 className="surv-header">Which type of step flashing is existing on the roof?</h1>

            <div className="flashing-inputs form-group">
            <label>Aluminum</label>
            <input
            style={{ width:"20px", height: "20px" }}
            type="checkbox"
            checked={roofTemplate.stepAluminum === true }
            onChange={(e) => setRoofTemplate({ ...roofTemplate, stepAluminum: !roofTemplate.stepAluminum })}
            />
            <label>Copper</label>
            <input
            style={{ width:"20px", height: "20px" }}
            type="checkbox"
            checked={roofTemplate.stepCopper === true }
            onChange={(e) => setRoofTemplate({ ...roofTemplate, stepCopper: !roofTemplate.stepCopper })}
            />
            <label>Metal</label>
            <input
            style={{ width:"20px", height: "20px" }}
            type="checkbox"
            checked={roofTemplate.stepGalvanized === true }
            onChange={(e) => setRoofTemplate({ ...roofTemplate, stepGalvanized: !roofTemplate.stepGalvanized })}
            />
            </div>
            </motion.div>
          )}
            </AnimatePresence>
            <div className="surv-accent1"></div>

            </div>
            <button className="survey-btn prev" onClick={() => stepFlashingPrev()}><i class="fas fa-chevron-left"></i></button>
            <button className="survey-btn next" onClick={() => stepFlashingNext()}><i class="fas fa-chevron-right"></i></button>

            </>
          )
    case "bol-counter":
          return (
            <>
            <div className="question-container">
            <AnimatePresence>
            { (isShown === 'bol-counter') && (
              <motion.div
              key={"1"}
              initial={{x: (prevSlideMotion==='bol-counter') ? "0" : "0", opacity: 0}}
              animate={{x:0, opacity:1}}
              exit={{x: prevSlideMotion==="roofType" ? "0" : "0", opacity:0}}
              transition={{ duration: .7 }}
              >
            <h1 className="surv-header">Is counter flashing existing on the roof?</h1>

            <div className="flashing-inputs form-group">
            <label>Yes</label>
            <input
            style={{ width:"20px", height: "20px" }}
            type="checkbox"
            checked={roofTemplate.bolCounter === true }
            onChange={(e) => {
              if(roofTemplate.bolCounter === ' ') {
                setRoofTemplate({ ...roofTemplate, bolCounter: true })
              } else {
                setRoofTemplate({ ...roofTemplate, bolCounter: !roofTemplate.bolCounter })
              }
            }}             />
            <label>No</label>
            <input
            style={{ width:"20px", height: "20px" }}
            type="checkbox"
            checked={roofTemplate.bolCounter === false }
            onChange={(e) => {
              if(roofTemplate.bolCounter === ' ') {
                setRoofTemplate({ ...roofTemplate, bolCounter: false })
              } else {
                setRoofTemplate({ ...roofTemplate, bolCounter: !roofTemplate.bolCounter })
              }
            }}             />
            </div>
            </motion.div>
          )}
            </AnimatePresence>
            <div className="surv-accent1"></div>

            </div>
            <button className="survey-btn prev" onClick={() => bolCounterPrev()}><i class="fas fa-chevron-left"></i></button>
            <button className="survey-btn next" onClick={() => bolCounterNext()}><i class="fas fa-chevron-right"></i></button>

            </>
          )
    case 'counter-flashing':
          return (
            <>
            <div className="question-container">
            <AnimatePresence>
            { (isShown === 'counter-flashing') && (
              <motion.div
              key={"1"}
              initial={{x: (prevSlideMotion==='counter-flashing') ? "0" : "0", opacity: 0}}
              animate={{x:0, opacity:1}}
              exit={{x: prevSlideMotion==="roofType" ? "0" : "0", opacity:0}}
              transition={{ duration: .7 }}
              >
            <h1 className="surv-header">Which type of counter flashing is existing on the roof?</h1>

            <div className="flashing-inputs form-group">
            <label>Aluminum</label>
            <input
            style={{ width:"20px", height: "20px" }}
            type="checkbox"
            checked={roofTemplate.counterAluminum === true }
            onChange={(e) => setRoofTemplate({ ...roofTemplate, counterAluminum: !roofTemplate.counterAluminum })}
            />
            <label>Copper</label>
            <input
            style={{ width:"20px", height: "20px" }}
            type="checkbox"
            checked={roofTemplate.counterCopper === true }
            onChange={(e) => setRoofTemplate({ ...roofTemplate, counterCopper: !roofTemplate.counterCopper })}
            />
            <label>Painted Metal</label>
            <input
            style={{ width:"20px", height: "20px" }}
            type="checkbox"
            checked={roofTemplate.counterPainted === true }
            onChange={(e) => setRoofTemplate({ ...roofTemplate, counterPainted: !roofTemplate.counterPainted })}
            />
            </div>
            </motion.div>
          )}
            </AnimatePresence>
            <div className="surv-accent1"></div>

            </div>
            <button className="survey-btn prev" onClick={() => counterFlashingPrev()}><i class="fas fa-chevron-left"></i></button>
            <button className="survey-btn next" onClick={() => counterFlashingNext()}><i class="fas fa-chevron-right"></i></button>

            </>
          )
    case "bol-chimney":
          return (
            <>
            <div className="question-container">
            <AnimatePresence>
            { (isShown === 'bol-chimney') && (
              <motion.div
              key={"1"}
              initial={{x: (prevSlideMotion==='bol-chimney') ? "0" : "0", opacity: 0}}
              animate={{x:0, opacity:1}}
              exit={{x: prevSlideMotion==="roofType" ? "0" : "0", opacity:0}}
              transition={{ duration: .7 }}
              >
            <h1 className="surv-header">Is chimney flashing existing on the roof?</h1>

            <div className="flashing-inputs form-group">
            <label>Yes</label>
            <input
            style={{ width:"20px", height: "20px" }}
            type="checkbox"
            checked={roofTemplate.bolChimney === true }
            onChange={(e) => {
              if(roofTemplate.bolChimney === ' ') {
                setRoofTemplate({ ...roofTemplate, bolChimney: true })
              } else {
                setRoofTemplate({ ...roofTemplate, bolChimney: !roofTemplate.bolChimney })
              }
            }}             />
            <label>No</label>
            <input
            style={{ width:"20px", height: "20px" }}
            type="checkbox"
            checked={roofTemplate.bolChimney === false }
            onChange={(e) => {
              if(roofTemplate.bolChimney === ' ') {
                setRoofTemplate({ ...roofTemplate, bolChimney: false })
              } else {
                setRoofTemplate({ ...roofTemplate, bolChimney: !roofTemplate.bolChimney })
              }
            }}             />
            </div>
            </motion.div>
          )}
            </AnimatePresence>
            <div className="surv-accent1"></div>

            </div>
            <button className="survey-btn prev" onClick={() => bolChimneyPrev()}><i class="fas fa-chevron-left"></i></button>
            <button className="survey-btn next" onClick={() => bolChimneyNext()}><i class="fas fa-chevron-right"></i></button>

            </>
          )
    case 'chimney-flashing':
          return (
            <>
            <div className="question-container">
            <AnimatePresence>
            { (isShown === 'chimney-flashing') && (
              <motion.div
              key={"1"}
              initial={{x: (prevSlideMotion==='chimney-flashing') ? "0" : "0", opacity: 0}}
              animate={{x:0, opacity:1}}
              exit={{x: prevSlideMotion==="roofType" ? "0" : "0", opacity:0}}
              transition={{ duration: .7 }}
              >
            <h1 className="surv-header">Which type of chimney flashing is existing on the roof?</h1>

            <div className="flashing-inputs form-group">
            <label>Aluminum</label>
            <input
            style={{ width:"20px", height: "20px" }}
            type="checkbox"
            checked={roofTemplate.chimneyAluminum === true }
            onChange={(e) => setRoofTemplate({ ...roofTemplate, chimneyAluminum: !roofTemplate.chimneyAluminum })}
            />
            <label>Copper</label>
            <input
            style={{ width:"20px", height: "20px" }}
            type="checkbox"
            checked={roofTemplate.chimneyCopper === true }
            onChange={(e) => setRoofTemplate({ ...roofTemplate, chimneyCopper: !roofTemplate.chimneyCopper })}
            />
            <label>Lead</label>
            <input
            style={{ width:"20px", height: "20px" }}
            type="checkbox"
            checked={roofTemplate.chimneyLead === true }
            onChange={(e) => setRoofTemplate({ ...roofTemplate, chimneyLead: !roofTemplate.chimneyLead })}
            />
            <label>Painted Metal</label>
            <input
            style={{ width:"20px", height: "20px" }}
            type="checkbox"
            checked={roofTemplate.chimneyPainted === true }
            onChange={(e) => setRoofTemplate({ ...roofTemplate, chimneyPainted: !roofTemplate.chimneyPainted })}
            />
            </div>
            </motion.div>
          )}
            </AnimatePresence>
            <div className="surv-accent1"></div>

            </div>
             <button className="survey-btn prev" onClick={() => chimneyFlashingPrev()}><i class="fas fa-chevron-left"></i></button>
              <button className="survey-btn next" onClick={() => chimneyFlashingNext()}><i class="fas fa-chevron-right"></i></button>

            </>
          )
    case 'materials-make':
      return (
        <>
          <div className="question-container">
          <AnimatePresence>
          { (isShown === 'materials-make') && (
            <motion.div
            key={"1"}
            initial={{x: (prevSlideMotion==='materials-make') ? "0" : "0", opacity: 0}}
            animate={{x:0, opacity:1}}
            exit={{x: prevSlideMotion==="roofType" ? "0" : "0", opacity:0}}
            transition={{ duration: .7 }}
            >
          <h1 className="surv-header">Which material manufacturer do you want to use?</h1>
          <div className="form-group">
          <label>Company</label>
          <select
          name="roof_type"
          id="roof_type"
          size="1"
          value={roofTemplate.materials}
          onChange={(e) => setRoofTemplate({ ...roofTemplate, materials: e.target.value })}>>
          <option value="select">Select manufacturer</option>
          <option value="owens">Owens Corning</option>
          </select>
          </div>
          </motion.div>
        )}
          </AnimatePresence>
          <div className="surv-accent1"></div>

          </div>
          <button className="survey-btn prev" onClick={() => matsPrev()}><i class="fas fa-chevron-left"></i></button>
          <button className="survey-btn next" onClick={() => matsNext()}><i class="fas fa-chevron-right"></i></button>
        </>
      )
    case "upgrade-tool":
          return   (
            <>
            <div className="selected upgradeOptions-container">
            <AnimatePresence>
            { (isShown === 'upgrade-tool') && (
              <motion.div
              key={"1"}
              initial={{x: (prevSlideMotion==='upgrade-tool') ? "0" : "0", opacity: 0}}
              animate={{x:0, opacity:1}}
              exit={{x: prevSlideMotion==="roofType" ? "0" : "0", opacity:0}}
              transition={{ duration: .7 }}
              >
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


            </motion.div>
          )}
            </AnimatePresence>
            </div>
            <div className="surv-accent1"></div>

            <button className="survey-btn prev" onClick={() => upgradeToolPrev()}><i class="fas fa-chevron-left"></i></button>
            <button className="survey-btn next" onClick={() => upgradeToolNext()}><i class="fas fa-chevron-right"></i></button>

            </>
          )
    case "selected-upgrades":
      return (
        <div>
        <div className="selected question-container">
        <AnimatePresence>
        { (isShown === 'selected-upgrades') && (
          <motion.div
          key={"1"}
          initial={{x: (prevSlideMotion==='selected-upgrades') ? "0" : "0", opacity: 0}}
          animate={{x:0, opacity:1}}
          exit={{x: prevSlideMotion==="roofType" ? "0" : "0", opacity:0}}
          transition={{ duration: .7 }}
          >
        <h1 className="surv-header">Selected Upgrades</h1>
          <table id="selected-table">
            <tbody>
            <tr>
              <th>Name</th>
              <th>Price</th>
            </tr>
              {selectedUpgrades()}
            </tbody>
          </table>
        </motion.div>
      )}
        </AnimatePresence>
        </div>
        <div className="surv-accent1"></div>

          <button className="survey-btn prev" onClick={() => selectedUpgradesPrev()}><i class="fas fa-chevron-left"></i></button>
        </div>
      )
  }
}

  return (
    <AnimatePresence exitBeforeEnter>
      {_switchRender()}
    </AnimatePresence>
  )

}
// checked
// <div className="form-group">
//   <label>Existing Roof?</label>
//   <input
//   style={{ width:"20px", height: "20px" }}
//   type="checkbox"
//   checked={roofTemplate.existingRoof === true }
//   onChange={(e) => setRoofTemplate({ ...roofTemplate, existingRoof: !roofTemplate.existingRoof })}
//   />
// </div>
