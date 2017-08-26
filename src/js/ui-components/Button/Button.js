import React from 'react'
import PropTypes from 'prop-types'
import style from './Button.scss'

const Button = props => (
  <button
    className={style.button}
    onClick={props.onClick}
    type='button'
  >
    {props.inner}
  </button>
)

Button.defaultProps = {
  inner: 'Btn',
  primary: false,
  disabled: false,
  onClick() {},
}

Button.propTypes = {
  inner: PropTypes.node,
  primary: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
}

export default Button
