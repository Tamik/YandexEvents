import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { onBoardingViewed } from 'actions/userActions'
import { replace } from 'actions/navigationActions'
import style from './style.scss'

const OnBoarding = (props) => {
  const goNext = () => {
    props.onGoNext()
  }
  return (
    <div className={'transition-item screen'}>
      <div className={style['page-inner']}>
        <h1>Welcome to NewYear on Yandex.Afisha</h1>
        <br /><br />
        <button
          style={{ background: '#fff', textDecoration: 'none', color: '#3c70c4' }}
          onClick={goNext}
        >
          Продолжить
        </button>
      </div>
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
