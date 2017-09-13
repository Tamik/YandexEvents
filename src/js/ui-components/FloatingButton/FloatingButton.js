import React from 'react'
import PropTypes from 'prop-types'

import { Icon } from 'ui-components'
import style from './style.scss'

const FloatingButton = props => (
  <button className={style.button} onClick={props.onClick}>
    {props.icon}
    <span style={{ marginLeft: 8, alignSelf: 'center' }}>{props.title}</span>
  </button>
)

FloatingButton.defaultProps = {
  title: null,
  icon: null,
}

FloatingButton.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.node,
  onClick: PropTypes.func.isRequired,
}

export default FloatingButton
