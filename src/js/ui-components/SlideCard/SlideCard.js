import React from 'react'
import PropTypes from 'prop-types'
import { Image } from 'ui-components'
import style from './style.scss'

const SlideCard = props => (
  <div
    className={`${style.slideCard} ${style[`slideCard_${props.size}`]}`}
    style={props.style}
    role='button'
    onClick={props.onClick}
  >
    <Image src={props.src} size={props.size} />
    <div
      className={`${style.slideCard__info} ${style[`slideCard__info_${props.size}`]}`}
    >
      <h3 className={`${style.slideCard__title} ${style[`slideCard__title_${props.size}`]}`}>
        {props.title}
      </h3>
      <p className={style.slideCard__text}>
        {props.date}
      </p>
    </div>
  </div>
)

SlideCard.defaultProps = {
  size: 'small',
  src: 'https://placehold.it/350x50',
  title: null,
  date: null,
  style: {},
}

SlideCard.propTypes = {
  size: PropTypes.string,
  src: PropTypes.string,
  title: PropTypes.string,
  date: PropTypes.string,
  style: PropTypes.shape(),
  onClick: PropTypes.func.isRequired,
}

export default SlideCard
