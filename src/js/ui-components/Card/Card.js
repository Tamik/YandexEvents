import React from 'react'
import PropTypes from 'prop-types'
import { Image } from 'ui-components'
import style from './style.scss'

const Card = props => (
  <div
    className={`${style[`card_${props.size}`]}`}
  >
    <Image src={props.src} />
    <p>{props.text}</p>
  </div>
)

Card.defaultProps = {
  size: 'small',
  src: 'http://placehold.it/350x50',
  text: 'PLOTVA',
}

Card.propTypes = {
  size: PropTypes.string,
  src: PropTypes.string,
  text: PropTypes.string,
}

export default Card
