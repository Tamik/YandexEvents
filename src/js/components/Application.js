import React from 'react'
import PageTransition from 'react-router-page-transition'
import { connect } from 'react-redux'

import { Main, Event, Category, Feed, Map, OnBoarding } from 'screens'
import style from './Application.scss'

const Application = (props) => {
  const route = props.router.route
  const routeChunks = window.location.hash.replace(/^#\/?|\/$/g, '').split('/')

  /*
    @TODO: Match URLs properly with regexp ;)
  */

  // Если пользователь впервые у нас, 
  // то покажем OnBoarding
  if (props.user.firstEnter) {
    return (<OnBoarding />)
  }

  // Main -> fragment -> Feed 
  if (!route || route === '#/main' || route === '#/' || route.indexOf('#/feed') > -1) {
    const params = {}
    return (
      <Main
        fragment={Feed}
        params={params}
      />
    )
  }

  // Main -> fragment -> Category
  if (route.indexOf('#/category') > -1) {
    const chunks = route.split('/') // #/category/([0-9])/(map|list)
    const categoryId = chunks[2]
    const viewMode = chunks[3]
    const params = { categoryId, viewMode }
    return (<Main
      fragment={Category}
      params={params}
    />)
  }

  // Screen Event
  if (route.indexOf('#/event') > -1) {
    const eventId = route.split('/')[2]
    const params = { eventId }
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
    view: state.view,
  }),
  dispatch => ({})
)(Application)

