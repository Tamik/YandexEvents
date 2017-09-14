import React from 'react'
import PropTypes from 'prop-types'
import ClassNames from 'classnames'

import style from './style.scss'

const Avatar = props => (
  <div className={ClassNames(style.Avatar)}>
    <div
      className={ClassNames(style.Avatar__img)}
      style={{
        backgroundImage: `url(${props.src})`,
      }}
      onClick={props.onClick}
      role='button'
    />
    <div className={ClassNames(style.Avatar__description)}>
      <p className={ClassNames(style.Avatar__title)}>{props.title}</p>
    </div>
  </div>
)

Avatar.defaultProps = {
  title: null,
  onClick: null,
}

Avatar.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string,
  onClick: PropTypes.func,
}

export default Avatar
