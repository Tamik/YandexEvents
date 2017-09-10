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
      style={props.style}
    >
      {props.label}
    </button>
  )
}

Button.defaultProps = {
  primary: false,
  disabled: false,
  style: {},
}

Button.propTypes = {
  label: PropTypes.node.isRequired,
  primary: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  style: PropTypes.shape(),
}

export default Button
