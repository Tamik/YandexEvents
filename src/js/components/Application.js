import React from 'react'
import PageTransition from 'react-router-page-transition'
import { connect } from 'react-redux'

import { Main, Event, Category, Feed, Map, OnBoarding } from '../screens'

import style from './Application.scss'

const Application = (props) => {
  const route = props.router.route
  const routeChunks = window.location.hash.replace(/^#\/?|\/$/g, '').split('/')

  /*
    @TODO: Match URLs properly
  */

  // Main -> Screen( OnBoarding | Feed )
  if (!route || route === '#/main' || route === '#/') {

    let Fragment = null

    if (props.user.firstEnter) {
      Fragment = OnBoarding
    }

    return (
      <Main
        fragment={Fragment}
      />
    )
  }

  // Screen Main ---> fragment Feed
  if (route.indexOf('#/feed') > -1) {
    return (
      <Main
        fragment={Feed}
      />
    )
  }
  
  // Screen Main ---> fragment Map
  if (route.indexOf('#/map') > -1) {
    return (
      <Main
        fragment={Map}
      />
    )
  }

  // Screen Category
  if (route.indexOf('#/category') > -1) {
    const id = route.split('/')[2]
    const params = { id }
    return <Category params={params} />
  }

  // Screen Place
  if (route.indexOf('#/place') > -1) {
    const id = route.split('/')[2]
    const params = { id }
    /* @todo: change to Place */
    return <div>PlaceId is {id}, but "screen/Place" not found, implement it here<br /><br /><strong>For going back, press GoBack button in your browser ;)</strong></div>
  }

  // Screen Event
  if (route.indexOf('#/event') > -1) {
    const id = route.split('/')[2]
    const params = { id }
    return <Event params={params} />
  }

  // @todo: redirect to Screen Main
  return <div>Not found ;)</div>
}

export default connect(
  state => ({
    user: state.user,
    router: state.router,
    data: state.data,
  }),
  dispatch => ({})
)(Application)

