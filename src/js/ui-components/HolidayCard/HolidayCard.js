import React from 'react'
import PropTypes from 'prop-types'
import ClassNames from 'classnames'

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
      className={ClassNames(style.card)}
      data-id={props.content.id}
      style={{
        backgroundImage: `url(${props.content.photo})`,
      }}
    >
      <h4 className={ClassNames(style.card__title)}>{props.content.title}</h4>
      <p className={ClassNames(style.card__time)}>
        {formattedDate.dates}
      </p>
      <button
        className={
          ClassNames(
            props.content.open ? style.card__buttonToggle_up : '',
            style.card__buttonToggle)
        }
        type='button'
        onClick={() => handleOpen(props)}
      >
        <Icon
          type='arrowUp'
          width='12px'
          height='8px'
        />
      </button>
      <div className={props.content.open ? 'textOpen' : 'textClose'}>
        <p className={ClassNames(style.card__text)}>{props.content.description}</p>
        {props.content.facts.map(item => (
          <div className={ClassNames(style.card__label)}>
            <p className={ClassNames(style.card__label_big)}>{item.one}</p>
            <p>{item.two}</p>
          </div>
        ))}
      </div>
      <button
        className={ClassNames(style.card__button)}
        type='button'
        onClick={() => addToCalendar(props.content.title, 'Москва', props.content.description)}
      >
        <Icon
          type='calendar'
          width='25px'
          height='23px'
        />
        <span style={{ marginLeft: 8 }}>Добавить<br /> в календарь</span>
      </button>
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
