import React from 'react'
import PropTypes from 'prop-types'

import { Icon } from 'ui-components'
import style from './style.scss'

const FloatingButton = props => (
  <button className={style.button} onClick={props.onClick}>
    <Icon type={props.typeIcon} height='24' color='#1e1367' />
    <span style={{ marginLeft: 8 }}>{props.title}</span>
  </button>
)

FloatingButton.propTypes = {
  title: PropTypes.string,
  typeIcon: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default FloatingButton
