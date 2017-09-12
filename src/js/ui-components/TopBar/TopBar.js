import React from 'react'
import PropTypes from 'prop-types'

import style from './style.scss'

const TopBar = (props) => {
  const transparent = props.isTransparent ? 'topBar_transparent' : null

  return (
    <div className={`${style.topBar} ${style[transparent]}`}>
      <button className={style.topBar__icon} onClick={props.onClick ? props.onClick.back : null}>
        {props.iconLeft}
      </button>
      <h2 className={style.topBar__title}>
        {props.title}
      </h2>
      <button
        className={style.topBar__icon}
        onClick={props.onClick ? props.onClick.favorite : null}
      >
        {props.iconRight}
      </button>
    </div>
  )
}

TopBar.defaultProps = {
  isVisible: true,
  isTransparent: false,
  iconRight: null,
  iconLeft: null,
  title: null,
  onClick: () => {},
}

TopBar.propTypes = {
  iconRight: PropTypes.element,
  iconLeft: PropTypes.element,
  onClick: PropTypes.func,
  title: PropTypes.string,
  isTransparent: PropTypes.bool,
}

export default TopBar
