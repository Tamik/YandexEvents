import React from 'react'
import PropTypes from 'prop-types'
import { Image } from 'ui-components'
import style from './style.scss'

const MapCard = props => (
  <div className={`${style.card} ${style[`card_${props.size}`]}`} onClick={props.onClick}>
    <Image src={props.src} size={props.size} />
    <div className={` ${style.card__info} ${style[`card__info_${props.size}`]}`}>
      <h3 className={` ${style.card__title} ${style[`card__title_${props.size}`]}`}>
        {props.title}
      </h3>
    </div>
  </div>
)

MapCard.defaultProps = {
  size: 'small',
  src: 'http://placehold.it/350x50',
}

MapCard.propTypes = {
  size: PropTypes.string,
  src: PropTypes.string,
  onClick: PropTypes.func,
}

export default MapCard
