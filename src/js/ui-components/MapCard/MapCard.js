import React from 'react'
import PropTypes from 'prop-types'

import { Image } from 'ui-components'
import style from './style.scss'
// eslint-disable-next-line import/first
import styleCard from 'ui-components/Card/style.scss'

const MapCard = props => (
  <div
    className={`${styleCard.card} ${style.mapCard}`}
    onClick={props.onClick}
    role='button'
  >
    <Image
      src={props.src}
      size={props.size}
      style={{
        height: 88,
        borderRadius: 4,
      }}
    />
    {
      props.isLeft
        ? <span className={styleCard.card__label}>завершено</span>
        : null
    }
    <p className={style.mapCard__text}>ежедневно, 11:00 — 19:00</p>
    <div className={style.mapCard__info}>
      <h3 className={style.mapCard__title}>
        {props.title}
      </h3>
    </div>
  </div>
)

MapCard.defaultProps = {
  size: 'small',
  src: 'http://placehold.it/350x50',
  title: null,
}

MapCard.propTypes = {
  size: PropTypes.string,
  src: PropTypes.string,
  title: PropTypes.string,
  onClick: PropTypes.func.isRequired,
}

export default MapCard
