import { useState } from 'react'
import onClickOutside from 'react-onclickoutside'

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react'

function DaySelect () {
  const select = []
  for (let i = 1; i <= 31; i++) {
    select.push({ id: i, value: i })
  }

  const [isActive, setIsActive] = useState(false)
  const [selected, setSelected] = useState([])
  const toggle = () => setIsActive(!isActive)
  const dayValidation = (e) => {
    if (!selected[0]) {
      setDayValid(false)
    } else {
      setDayValid(true)
    }
  }

  const [dayValid, setDayValid] = useState(true)

  const handleOnClick = item => {
    setDayValid(true)
    setSelected([item])
  }

  DaySelect.handleClickOutside = () => setIsActive(false)

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
    onBlur={(e) => dayValidation(e)}

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
      padding: 0px 10px;
      box-sizing: border-box;
      grid-template-columns: 40% 25% 30%;
      width: 100px;
      min-height: 25px;
      &:focus {
        outline: 1px solid #317f6d;
      }
      &:hover {
        border: 1px solid #63686f;
      }
    `}>
      <div
      className={ dayValid ? 'day-dropdown-wrapper' : 'day-red red'}
        role="button"

        onKeyPress={() => toggle(!isActive)}
        onClick={(e) => toggle(!isActive)}>
        <div classeName="dropdown-header">
          <p className="dropdown-header-title-bold"><span css={css`text-align:left;`}>{ (!selected[0]) ? 'Day' : selected[0].value } </span><span css={css`position: absolute; right: 10px;`}>{isActive
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
            max-height: 165px;
            overflow-y: auto;
            padding: 2.5px 5px;
            box-sizing: border-box;
            box-shadow: 0px 0px 20px rgb(34,38,45);
            grid-template-columns: 40% 25% 30%;
            width: 100px;
          `}
          className="dropdown-list">
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
                }`}className="dropdown-list-item" key={item.id}>
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
          { dayValid ? '' : 'This field is required*'}
        </em>
        </div>
  )
}

const clickOutsideConfig = {
  handleClickOutside: () => DaySelect.handleClickOutside
}
export default onClickOutside(DaySelect, clickOutsideConfig)
