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
  src: 'http://placehold.it/50x50',
  size: 'small',
}

Avatar.propTypes = {
  src: PropTypes.string,
  size: PropTypes.string,
  text: PropTypes.string,
}

export default Avatar
