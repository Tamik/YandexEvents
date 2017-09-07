import React from 'react'
import PropTypes from 'prop-types'

import style from './style.scss'

const Avatar = props => (
  <div className={style.avatar}>
    <div
      className={style.avatar__img}
      style={{ backgroundImage: `url(${props.src})` }}
    />
    <div className={style.avatar__description}>
      <p className={style.avatar__title}>{props.title}</p>
    </div>
  </div>
)

Avatar.defaultProps = {
  src: 'https://placehold.it/128x128',
  title: null,
}

Avatar.propTypes = {
  src: PropTypes.string,
  title: PropTypes.string,
}

export default Avatar
