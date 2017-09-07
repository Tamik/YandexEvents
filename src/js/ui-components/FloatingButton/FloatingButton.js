import React from 'react'
import PropTypes from 'prop-types'

import style from './style.scss'

const FloatingButton = props => (
  <button className={style.button} onClick={props.onClick}>
    {props.label}
  </button>
)

FloatingButton.propTypes = {
  label: PropTypes.node,
  onClick: PropTypes.func,
}

export default FloatingButton
