import React from 'react'
import PropTypes from 'prop-types'
import Image from './../Image'

const Avatar = props => (
  <Image src={props.src} size={props.size} />
)

Avatar.defaultProps = {
  src: 'http://placehold.it/50x50',
  size: 'small',
}

Avatar.propTypes = {
  src: PropTypes.string,
}

export default Avatar
