import React from 'react'
import PropTypes from 'prop-types'
import { Image } from 'ui-components'
import style from './style.scss'

const SmallCard = props => (
  <div
    className={`${style[`card_${props.size}`]}`}
  >
    <Image src={props.src} />
    <p>{props.text}</p>
  </div>
)

SmallCard.defaultProps = {
  size: 'small',
  src: 'http://placehold.it/350x50',
  text: 'PLOTVA',
}

SmallCard.propTypes = {
  size: PropTypes.string,
  src: PropTypes.string,
  text: PropTypes.string,
}

export default SmallCard
