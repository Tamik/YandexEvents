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
      <div
        className={style['page-inner']}
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '46px 22px 16px',
          backgroundColor: '#1e1367',
          backgroundImage: 'url(onboarding.png)',
          fontSize: '1.5rem',
        }}
      >
        <h1 style={{ fontWeight: 'normal', fontSize: '1.5rem', marginBottom: 16 }}>Юбилей Москвы!</h1>
        <p>Мы выбрали самое интересное.</p>

        <button
          style={{ marginTop: 'auto', background: '#fff', textDecoration: 'none', padding: 16, fontSize: '1.25rem', color: '#2a3034', border: 'none' }}
          onClick={goNext}
        >
          Далее
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
