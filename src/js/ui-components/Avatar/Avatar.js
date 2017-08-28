import React from 'react'
import PropTypes from 'prop-types'
import style from './style.scss'
import { Image } from 'ui-components'

const Avatar = props => (
  <div>
    <div
      className={`${style.avatar} ${style[`avatar_${props.size}`]}`}
      style={{ backgroundImage: `url(${props.src})` }}
    />
    { props.text
      ? <p className={style['avatar__text']}>{props.text}</p>
      : null
    }
  </div>
)

Avatar.defaultProps = {
  src: 'http://placehold.it/50x50',
  size: 'small',
  text: 'Baskov privet',
}

Avatar.propTypes = {
  src: PropTypes.string,
  size: PropTypes.string,
  text: PropTypes.string,
}

export default Avatar
