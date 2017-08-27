import React from 'react'
import PropTypes from 'prop-types'
import { Image } from 'ui-components'

const Avatar = props => (
  <Image src={props.src} size='small' />
)

Avatar.defaultProps = {
  src: 'http://placehold.it/50x50',
}

Avatar.propTypes = {
  src: PropTypes.string,
}

export default Avatar
