import React from 'react'
import PropTypes from 'prop-types'

import style from './style.scss'

const Container = (props) => {
  const scrollStyle = props.scrolling ? 'container_scroll' : null
  const stretchStyle = props.stretching ? 'container_stretch' : null

  return (
    <div className={`${style.container} ${style[scrollStyle]} ${style[stretchStyle]}`} />
  )
}

Container.defaultProps = {
  scrolling: false,
}

Container.propTypes = {
  scrolling: PropTypes.bool,
  stretching: PropTypes.bool,
}

export default Container
