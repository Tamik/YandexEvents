import React from 'react'
import PropTypes from 'prop-types'
import style from './style.scss'

const Button = (props) => {
  const styleDisabled = props.disabled ? 'button_disabled' : null

  return (
    <button
      className={`${style.button} ${style[styleDisabled]}`}
      onClick={props.onClick}
      type='button'
      disabled={props.disabled}
    >
      {props.inner}
    </button>
  )
}

Button.defaultProps = {
  inner: 'Btn',
  primary: false,
  disabled: true,
  onClick() {},
}

Button.propTypes = {
  inner: PropTypes.node,
  primary: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
}

export default Button
