import React from 'react'
import PageTransition from 'react-router-page-transition'
import { connect } from 'react-redux'

import style from './Application.scss'

import { Main } from '../screens'

const Application = (props) => {
  const route = props.state.router.route

  if (route === '#/main') {
    return <Main />
  }
  if (route === '#/one') {
    return <div>One</div>
  }
  return <div>Not found</div>
}

export default connect(state => ({ state }))(Application)

