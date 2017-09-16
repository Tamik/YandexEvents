import React from 'react'
import PropTypes from 'prop-types'
import ClassNames from 'classnames'

import { Image } from 'ui-components'
import styleCard from 'ui-components/Card/style.scss'

import { Daty } from 'utils'

import style from './style.scss'

const MapCard = (props) => {
  const formattedDate = Daty.beautifyDatesRange(
    props.time.begin,
    props.time.end
  )

  return (
    <div
      className={ClassNames(styleCard.card, style.mapCard, style[`mapCard_${props.option}`])}
      onClick={props.onClick}
      role='button'
    >
      <div className={ClassNames(style.mapCard__wrap)}>
        <Image
          src={props.src}
          size={props.size}
          style={{
            height: 88,
          }}
        />
        <p className={ClassNames(style.mapCard__text)}>
          {formattedDate.dates}, {formattedDate.time}
        </p>
        <div className={ClassNames(style.mapCard__info)}>
          <h3 className={ClassNames(style.mapCard__title)}>
            {props.title}
          </h3>
        </div>
      </div>
    </div>
  )
}

MapCard.defaultProps = {
  size: 'small',
  src: 'http://placehold.it/350x50',
  title: null,
  option: null,
  time: {
    begin: 'Sat, 14 Sep 2017 07:36:44',
    end: 'Sat, 16 Sep 2017 07:36:44',
  },
}

MapCard.propTypes = {
  size: PropTypes.string,
  src: PropTypes.string,
  title: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  option: PropTypes.string,
}

export default MapCard
