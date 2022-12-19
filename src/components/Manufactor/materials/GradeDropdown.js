/* eslint-disable react/prop-types */
// eslint-disable-next-line
import React, { useState } from 'react'
import onClickOutside from 'react-onclickoutside'

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react'

function GradeDropdown (props) {
  const [monthValid, setMonthValid] = useState(true)
  const [isActive, setIsActive] = useState(false)
  const [selected, setSelected] = useState([])
  const toggle = () => setIsActive(!isActive)

  GradeDropdown.handleClickOutside = () => setIsActive(false)

  const handleOnClick = item => {
    setMonthValid(true)
    setSelected([item])
    if (!props.setNewMargin) {
      props.setNewData({ ...props.newData, grade: item.value })
    } else {
      props.setNewMargin({ ...props.newMargin, grade: item.value })
    }

  }

  const monthValidation = (e) => {
    if (!selected[0]) {
      setMonthValid(false)
    } else {
      setMonthValid(true)
    }
  }

  const select = [
    { id: '1', value: 'Builder Grade' },
    { id: '2', value: 'High Grade' },
    { id: '3', value: 'Designer Grade' },
    { id: '4', value: 'Specialty Grade' }
  ]
  const isItemInSelection = (item) => {
    if (selected.find(current => current.id === item.id)) {
      return true
    }
    return false
  }

  return (
    <div css={ css`
    position:relative;
    height: 10px;
    margin-top: -20px;
    width: 100%;
    `}>
    <div
    tabIndex={0}
    role="button"
    onKeyPress={() => toggle(!isActive)}
    onClick={(e) => toggle(!isActive)}
// {    onBlur={(e) => monthValidation(e)}    exit focus validation }
      css={css`
      text-align: center;
      background: #2a2e35 ;
      position: relative;
      display:flex;
      align-items: center;
      justify-content: flex-start;
      font-size: 15px;
      font-family: "Poppins", -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
        color: #333333;
        letter-spacing: .5px;
        background: white ;
        border: 1px solid lightgrey;
      border-radius: 5px;
      max-height: 15px;
      border-radius: 5px;
      margin: 0px 18px;
      padding: 26px 0 10px 16px;
      box-sizing: border-box;
      grid-template-columns: 40% 25% 30%;
      width: 100%;
      overflow:visible;

      min-height: 15px;
      &:focus {
        outline: 1px solid #02EF9D;
    }
      &:hover {
        border: 1px solid #63686f;
      }
    `}>
      <div
        className={ monthValid ? 'month-dropdown-wrapper' : 'month-red red'}
        role="button"
        onKeyPress={() => toggle(!isActive)}
        onClick={(e) => toggle(!isActive)}>
        <div>
          <p css={css`display: flex;`}><span css={css`text-align:left;`}>{ (!selected[0]) ? <span css={css` color:#757575;`}>Grade</span> : selected[0].value } </span><span css={css`position: absolute; right: 10px;`}>{isActive
            ? <span className="fas fa-caret-down up"></span>
            : <span className="fas fa-caret-down"></span>
        }</span></p>
        </div>
        </div>
        </div>
        <div >
          <p></p>
        </div>
        { isActive && (
          <div
          css={css`
            text-align: center;
            position: absolute;
            z-index: 19;
            font-size: 12px;
            font-weight: 500;
            font-family: "Poppins", -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
              'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
              sans-serif;
            color: #333333;
            background: white ;
            border: 1px solid lightgrey;
            border-radius: 5px;
            max-height: 122px;
            overflow-y: auto;
            outline: 10px solid transparent;
            margin-top: -25px;
            padding: 15px 15px 0;
            box-sizing: border-box;
            box-shadow: 3px 10px 20px #787878;
            grid-template-columns: 40% 25% 30%;
            width: 200px;
            &:focus {
                outline: 1px solid #02EF9D;
            }
          `}>
            {select.map(item => (
              <div
              onKeyPress={() => toggle(!isActive)}
              onClick={(e) => toggle(!isActive)}

              css={css`
                width: 100%;
                  transition: .2s font-size ease;
                 &:hover {
                  cursor: pointer;
                  font-size: 14px;
                }`}
               key={item.id}>
                <p
                css={css`
                  text-align:left;
                  `}
                type="button" onClick={(e) => {
                  e.preventDefault()
                  handleOnClick(item)
                }}>
                  {item.value}
                  <p>{isItemInSelection(item)}</p>
                </p>
              </div>
            ))}
          </div>
        )}
        <em
        css={css`text-align:left;
          font-family: "Poppins", sans serif;
          position: absolute;
          height: 6px;
          width: 100px;
          left: 0;
          bottom: 5px;
          color: red;
          font-size: 8px;`}>
          { monthValid ? '' : 'This field is required*'}
        </em>
        </div>
  )
}

const clickOutsideConfig = {
  handleClickOutside: () => GradeDropdown.handleClickOutside
}

export default onClickOutside(GradeDropdown, clickOutsideConfig)
