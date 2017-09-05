import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { onBoardingViewed } from 'actions/userActions'
import { replace } from 'actions/navigationActions'

import { Container, BottomNavigation, Icon } from 'ui-components'
import style from './style.scss'
import styleBotNav from 'ui-components/BottomNavigation/style.scss'

const OnBoarding = (props) => {
  const goNext = () => {
    props.onGoNext()
  }

  return (
    <div
      className='transition-item screen'
      style={{
        padding: '46px 22px 16px',
        backgroundColor: '#1e1367',
        fontSize: '1.5rem',
        color: '#fff',
      }}
    >
      <Container
        stretching
        background
      >
        <div className={style.board__wrap}>
          <h1 className={style.board__title}>Сегодня День Города!</h1>
          <p className={style.board__title}>Мы собрали все события и выбрали самое лучшее.</p>

          <button
            className={style.board__btn}
            onClick={goNext}
          >
            Далее
          </button>
        </div>
      </Container>
      <BottomNavigation>
        <div className={`${styleBotNav.botNav__item}`}>
          <Icon type='star' height='20' />
          Лучшее
        </div>
        <div className={`${styleBotNav.botNav__item}`}>
          <Icon type='ticket' height='20' />
          Мои билеты
        </div>
        <div className={`${styleBotNav.botNav__item}`}>
          <Icon type='moscowDayActive' height='20' />
          День Города
        </div>
        <div className={`${styleBotNav.botNav__item}`}>
          <Icon type='search' height='20' />
          Поиск
        </div>
        <div className={`${styleBotNav.botNav__item}`}>
          <Icon type='profile' height='20' />
          Профиль
        </div>
      </BottomNavigation>
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
