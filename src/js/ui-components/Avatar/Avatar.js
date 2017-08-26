import React from 'react'
import PropTypes from 'prop-types'

const Avatar = props => (
  <div>
    <img src={props.src} style={{}} alt='Pri' />
  </div>
)

Avatar.defaultProps = {
  src: 'http://placehold.it/350x50',
}

Avatar.propTypes = {
  src: PropTypes.string,
}

export default Avatar
