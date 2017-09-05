import React from 'react'
import PropTypes from 'prop-types'
import { Image } from 'ui-components'
import style from './style.scss'

const Card = props => (
  <div
    className={`${style.card} ${style[`card_${props.size}`]}`}
  >
    <Image src={props.src} size={props.size} />
    <div
      className={`${style.card__info} ${style[`card__info_${props.size}`]}`}
    >
      <h3 className={`${style.card__title} ${style[`card__title_${props.size}`]}`}>
        {props.title}
      </h3>
      <p className={style.card__text}>
        {props.dateInfo}
      </p>
    </div>
  </div>
)

Card.defaultProps = {
  size: 'small',
  src: 'http://placehold.it/350x50',
  text: 'some text',
}

Card.propTypes = {
  size: PropTypes.string,
  src: PropTypes.string,
  text: PropTypes.string,
}

export default Card
