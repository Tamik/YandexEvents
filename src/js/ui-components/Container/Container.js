import React from 'react'
import PropTypes from 'prop-types'
import ClassNames from 'classnames'

import style from './style.scss'

const Container = (props) => {
  const scrollStyle = props.scrolling ? 'container_scroll' : null
  const stretchStyle = props.stretching ? 'container_stretch' : null
  const colorStyle = props.color ? 'container_color' : null

  return (
    <div
      className={ClassNames(style[scrollStyle], style[stretchStyle], style[colorStyle])}
    >
      { React.Children.toArray(props.children) }
    </div>
  )
}

Container.defaultProps = {
  scrolling: false,
  stretching: false,
  color: false,
}

Container.propTypes = {
  scrolling: PropTypes.bool,
  stretching: PropTypes.bool,
  children: PropTypes.element.isRequired,
}

export default Container
