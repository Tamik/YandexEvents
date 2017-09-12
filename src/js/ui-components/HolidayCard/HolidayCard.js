import React from 'react'
import ReactDom from 'react-dom'

import PropTypes from 'prop-types'

import { Icon } from 'ui-components'

import { addToCalendar, Daty } from 'utils'

import style from './style.scss'

const handleOpen = (props) => {
  props.onClick(props.content.id)
}

const HolidayCard = (props) => {
  const formattedDate = Daty.beautifyDatesRange(
    props.content.enabledBetweenDates.from,
    props.content.enabledBetweenDates.to
  )

  return (
    <div
      className={style.card}
      data-id={props.content.id}
      style={{
        backgroundImage: `url(${props.content.photo})`,
      }}
    >
      <h4 className={style.card__title}>{props.content.title}</h4>
      <p className={style.card__time}>
        {formattedDate.dates}
      </p>
      <button
        className={`${props.content.open ? style.card__button_up : ''} ${style.card__button}`}
        onClick={() => handleOpen(props)}
      >
        <Icon
          type='arrowUp'
          width='12px'
          height='8px'
        />
      </button>
      <div className={props.content.open ? 'textOpen' : 'textClose'}>
        <p className={style.card__text}>{props.content.description}</p>
        {props.content.facts.map(item => (
          <div><p className={style.card__label}>{item}</p><br /></div>
        ))}
        <button
          type='button'
          onClick={() => addToCalendar(props.content.title, 'description', 'location')}
        >add</button>
      </div>
    </div>
  )
}

HolidayCard.defaultProps = {}

HolidayCard.propTypes = {
  content: PropTypes.shape({
    title: PropTypes.string,
    enabledBetweenDates: PropTypes.shape(),
  }).isRequired,
}

export default HolidayCard
