import React from 'react'
import PropTypes from 'prop-types'

import { Icon } from 'ui-components'
import style from './style.scss'

const TopBar = (props) => {
  const transparent = props.isTransparent ? 'topBar_transparent' : null

  return (
    <div className={`${style.topBar} ${style[transparent]}`}>
      <button className={style.topBar__icon} onClick={props.onClick}>
        {props.iconLeft}
      </button>
      <h2 className={style.topBar__title}>
        {props.title}
      </h2>
      <button className={style.topBar__icon}>
        {props.iconRight}
      </button>
    </div>
  )
}

TopBar.defaultProps = {
  isVisible: true,
}

TopBar.propTypes = {
  iconRight: PropTypes.element,
  iconLeft: PropTypes.element,
  onCLick: PropTypes.func,
  title: PropTypes.string,
  isTransparent: PropTypes.bool,
}

export default TopBar
