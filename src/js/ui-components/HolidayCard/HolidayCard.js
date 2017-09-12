import React from 'react'
import PropTypes from 'prop-types'

import { Daty } from 'utils'

import style from './style.scss'

const HolidayCard = (props) => {
  const formattedDate = Daty.beautifyDatesRange(
    props.content.enabledBetweenDates.from,
    props.content.enabledBetweenDates.to
  )
  return (
    <div
      className={style.card}
    >
      <h4 className={style.card__title}>{props.content.title}</h4>
      <p className={style.card__time}>
        {formattedDate.dates}
      </p>
      <p className={style.card__text}>
        Москва отметит 870 лет со дня основания. В этом году День города пройдет
        в стиле русского авангарда более чем на 50 площадках. Под слоганом «Москва
        — город, где создается история» будут объединены семь тематик, посвященных
        важным вехам истории столицы.
      </p>
      <p className={style.card__label}>1 000 000 посетителей</p>
      <br />
      <p className={style.card__label}>50 площадок</p>
    </div>
  )
}

export default HolidayCard
