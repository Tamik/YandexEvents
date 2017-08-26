import React from 'react'
import PropTypes from 'prop-types'

const Image = props => (
  <img src={props.src} style={{}} alt='q' />
)

Image.defaultProps = {
  src: 'http://placehold.it/350x50',
}

Image.propTypes = {
  src: PropTypes.string,
}

export default Image
