import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import style from './OnBoarding.scss'

const OnBoarding = props => (
  <div className={'transition-item screen'}>
    <div className={style['page-inner']}>
      <h1>Welcome to NewYear on Yandex.Afisha</h1>
      <br /><br />
      <Link to='/feed' style={{ background: '#fff', textDecoration: 'none', color: '#3c70c4' }} onClick={() => props.dispatch({ type: 'FIRST_LOG' })}>Продолжить</Link>
    </div>
  </div>
)

OnBoarding.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

export default connect()(OnBoarding)
