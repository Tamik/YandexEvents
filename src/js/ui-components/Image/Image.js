import React from 'react'
import PropTypes from 'prop-types'
import style from './style.scss'

const Image = props => (
  <div
    style={{ backgroundImage: `url(${props.src})` }}
    className={style[`image_${props.size}`]}
  />
)

Image.defaultProps = {
  src: 'http://placehold.it/350x50',
  size: 'small',
}

Image.propTypes = {
  src: PropTypes.string,
  size: PropTypes.string,
}

export default Image
