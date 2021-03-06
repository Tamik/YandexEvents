import React from 'react'
import PropTypes from 'prop-types'
import ClassNames from 'classnames'

import { Image } from 'ui-components'
import style from './style.scss'

const Card = props => (
  <div
    className={ClassNames(style.card, style[`card_${props.size}`])}
    style={props.style}
    onClick={props.onClick}
    role='button'
  >
    <Image
      src={props.src}
      size={props.size}
    />

    {/* { */}
    {/* props.isLeft */}
    {/* ? <span className={style.card__label}>завершено</span> */}
    {/* : null */}
    {/* } */}

    <div
      className={ClassNames(style.card__info, style[`card__info_${props.size}`])}
    >
      <h3 className={ClassNames(style.card__title, style[`card__title_${props.size}`])}>
        {props.title}
      </h3>
      <p className={style.card__text}>
        {props.date}
      </p>
    </div>
  </div>
)

Card.defaultProps = {
  size: 'small',
  src: 'https://placehold.it/350x50',
  title: null,
  date: null,
  style: null,
}

Card.propTypes = {
  size: PropTypes.string,
  src: PropTypes.string,
  title: PropTypes.string,
  date: PropTypes.string,
  style: PropTypes.shape(),
  onClick: PropTypes.func.isRequired,
}

export default Card
