/* eslint-disable react/prop-types */
// eslint-disable-next-line
import React, { useState } from 'react'
import onClickOutside from 'react-onclickoutside'

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react'

function MonthSelect (props) {
  const [monthValid, setMonthValid] = useState(true)
  const [isActive, setIsActive] = useState(false)
  const [selected, setSelected] = useState([])
  const toggle = () => setIsActive(!isActive)

  MonthSelect.handleClickOutside = () => setIsActive(false)

  const handleOnClick = item => {
    setMonthValid(true)
    setSelected([item])
  }

  const monthValidation = (e) => {
    if (!selected[0]) {
      setMonthValid(false)
    } else {
      setMonthValid(true)
    }
  }

  const select = [
    { id: '1', value: 'January' },
    { id: '2', value: 'Februrary' },
    { id: '3', value: 'March' },
    { id: '4', value: 'April' },
    { id: '5', value: 'May' },
    { id: '6', value: 'June' },
    { id: '7', value: 'July' },
    { id: '8', value: 'August' },
    { id: '9', value: 'September' },
    { id: '10', value: 'October' },
    { id: '11', value: 'November' },
    { id: '12', value: 'December' }
  ]
  const isItemInSelection = (item) => {
    if (selected.find(current => current.id === item.id)) {
      return true
    }
    return false
  }

  return (
    <div css={ css`position:relative`}>
    <div
    tabIndex={0}
    role="button"
    onKeyPress={() => toggle(!isActive)}
    onClick={(e) => toggle(!isActive)}
    onBlur={(e) => monthValidation(e)}
    css={css`
      text-align: center;
      background: #2a2e35 ;
      position: relative;
      display:flex;
      align-items: center;
      justify-content: flex-start;
      font-size: 10px;
      font-family: "Poppins", -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
      color: #ccd3da;
      background: #2a2e35 ;
      border: 1px solid #3e434a;
      border-radius: 5px;
      max-height: 25px;
      margin: 7px 0;
      padding: 14px 10px 0;
      box-sizing: border-box;
      grid-template-columns: 40% 25% 30%;
      width: 160px;
      min-height: 25px;
      &:focus {
        border: 1px solid #317f6d;
        outline:none;
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
        <div classeName="dropdown-header">
          <p css={css`display: flex;`}><span css={css`text-align:left;`}>{ (!selected[0]) ? 'Month' : selected[0].value } </span><span css={css`position: absolute; right: 10px;`}>{isActive
            ? <span className="fas fa-caret-down up"></span>
            : <span className="fas fa-caret-down"></span>
        }</span></p>
        </div>
        </div>
        </div>
        <div className="dropdown-header_action">
          <p></p>
        </div>
        { isActive && (
          <div
          css={css`
            text-align: center;
            background: #3A3F46 ;
            position: absolute;
            z-index: 9;
            font-size: 10px;
            font-weight: 500;
            font-family: "Poppins", -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
              'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
              sans-serif;
            color: #ccd3da;
            border: 1px solid #3e434a;
            border-radius: 5px;
            max-height: 122px;
            overflow-y: auto;
            padding: 2.5px 5px;
            box-sizing: border-box;
            box-shadow: 0px 0px 20px rgb(34,38,45);
            grid-template-columns: 40% 25% 30%;
            width: 160px;
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
                  font-size: 11px;
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
  handleClickOutside: () => MonthSelect.handleClickOutside
}

export default onClickOutside(MonthSelect, clickOutsideConfig)
