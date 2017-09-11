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
      <p className={style.card__text}>
        {formattedDate.dates}
      </p>
    </div>
  )
}

export default HolidayCard
