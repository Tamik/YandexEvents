import React from 'react'
import PageTransition from 'react-router-page-transition'
import { connect } from 'react-redux'

import style from './Application.scss'

import { Main, Event, Category } from '../screens'

const Application = (props) => {
  const route = props.state.router.route
  const routeChunks = window.location.hash.replace(/^#\/?|\/$/g, '').split('/')

  /*
    @TODO: Match URLs properly
  */

  // Main -> Screen( OnBoarding | Feed )
  if (!route || route === '#/main' || route === '#/' || route.indexOf('#/feed') > -1) {
    return <Main />
  }

  // Screen Map
  if (route.indexOf('#/map') > -1) { 
    // here
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
  state => ({ state }),
  dispatch => ({})
)(Application)

