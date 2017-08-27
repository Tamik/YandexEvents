import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import style from './OnBoarding.scss'

const OnBoarding = props => (
  <div className={`transition-item ${style.onBoard}`}>
    <h1>This is Welcome Component</h1>
    <Link to='/' onClick={() => props.dispatch({ type: 'FIRST_LOG' })}>Enter (to Feed Component)</Link>
  </div>
)

OnBoarding.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

export default connect()(OnBoarding)
