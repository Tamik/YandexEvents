import React from 'react'
import PropTypes from 'prop-types'

import style from './style.scss'

const Container = (props) => {
  const scrollStyle = props.scrolling ? 'container_scroll' : null
  const stretchStyle = props.stretching ? 'container_stretch' : null
  const backgroundStyle = props.background ? 'container_image' : null

  return (
    <div className={`${style[scrollStyle]} ${style[stretchStyle]} ${style[backgroundStyle]}`}>
      { React.Children.toArray(props.children) }
    </div>
  )
}

Container.defaultProps = {
  scrolling: false,
  stretching: false,
  background: false,
}

Container.propTypes = {
  scrolling: PropTypes.bool,
  stretching: PropTypes.bool,
  background: PropTypes.bool,
  children: PropTypes.element.isRequired,
}

export default Container
