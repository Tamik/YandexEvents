import React from 'react'
import PropTypes from 'prop-types'

import style from './style.scss'

const TopBar = (props) => {
  const transparent = props.isTransparent ? 'topBar_transparent' : null

  return (
    <div className={`${style.topBar} ${style[transparent]}`}>
      <span className={style.topBar__icon}>{props.icon}</span>
      <h2 className={style.topBar__title}>
        {props.title}
      </h2>
    </div>
  )
}

TopBar.defaultProps = {
  isVisible: true,
}

TopBar.propTypes = {
  // icon: PropTypes.element,
  title: PropTypes.string,
  isTransparent: PropTypes.bool,
}

export default TopBar
