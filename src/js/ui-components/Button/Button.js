import React from 'react'
import PropTypes from 'prop-types'

import style from './style.scss'

const Button = (props) => {
  const styleDisabled = props.disabled ? 'button_disabled' : null
  const stylePrimary = props.primary ? 'button_primary' : null

  return (
    <button
      type='button'
      className={`${style.button} ${style[stylePrimary]} ${style[styleDisabled]}`}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.label}
    </button>
  )
}

Button.defaultProps = {
  label: 'Кнопка',
  primary: false,
  disabled: false,
  onClick() { },
}

Button.propTypes = {
  label: PropTypes.node,
  primary: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
}

export default Button
