import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { onBoardingViewed } from 'actions/userActions'
import { replace } from 'actions/navigationActions'

import { BottomNav } from 'components'
import SliderLib from 'react-slick'
import { Container } from 'ui-components'

import styleSlider from 'ui-components/Slider/style.scss'
import style from './style.scss'

import imageSlide1 from './slide1.svg'
import imageSlide2 from './slide2.svg'
import imageSlide3 from './slide3.svg'

const OnBoarding = (props) => {
  const goNext = () => {
    props.onGoNext()
  }

  const next = () => {
    this.SliderLib.slickNext()
  }

  const settings = {
    dots: true,
    infinite: false,
    speed: 400,
    arrows: false,
    slidesToShow: 1,
    swipe: true,
  }

  return (
    <div
      className='transition-item screen'
      style={{
        fontSize: '1.5rem',
        color: '#fff',
      }}
    >
      <SliderLib
        ref={(slider) => {
          this.SliderLib = slider
        }}
        {...settings}
      >
        <div key={1} className={style.board__wrap}>
          <div
            className={style.board__image}
            style={{ backgroundImage: `url(${imageSlide1})` }}
          />

          <p className={style.board__text}>
            Простой, но удобный путеводитель по городским праздникам и акциям
          </p>

          <button
            className={style.board__btn}
            onClick={next}
          >
            Далее
          </button>
        </div>

        <div key={2} className={style.board__wrap}>
          <div
            className={style.board__image}
            style={{ backgroundImage: `url(${imageSlide2})` }}
          />

          <p className={style.board__text}>
            Находите самые интересные события рядом с вами
          </p>

          <button
            className={style.board__btn}
            onClick={next}
          >
            Далее
          </button>
        </div>

        <div key={3} className={style.board__wrap}>
          <div
            className={style.board__image}
            style={{ backgroundImage: `url(${imageSlide3})` }}
          />

          <p className={style.board__text}>
            Добавляйте в календарь напоминания о любимых праздниках
          </p>

          <button
            className={style.board__btn}
            onClick={goNext}
          >
            Далее
          </button>
        </div>
      </SliderLib>
    </div>
  )
}

export default connect(
  state => ({
    user: state.user,
  }),
  dispatch => ({
    onGoNext: () => {
      dispatch(replace('/feed'))
      dispatch(onBoardingViewed())
    },
  })
)(OnBoarding)
