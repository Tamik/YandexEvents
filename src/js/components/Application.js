import React from 'react'
import PageTransition from 'react-router-page-transition'
import { connect } from 'react-redux'

import { OnBoarding, Main, Event, Place, Category, Feed, Map, Entity } from 'screens'
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

  // /
  // /feed
  //    /feed/list
  //    /feed/map
  // /category/999
  //    /category/999/list
  //    /category/999/map
  // /place/999
  // /entity/999
  // /holidays - tab two
  // /favorites - tab three
  //    /list
  //    /map
  // /event

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

  /**
   * General screens
   */
  // Screen Event
  if (route.indexOf('#/entity') > -1) {
    const entityId = route.split('/')[2]
    const params = { entityId }
    return <Entity params={params} />
  }

  // Screen Event
  if (route.indexOf('#/event') > -1) {
    const eventId = route.split('/')[2]
    const params = { eventId }
    return <Event params={params} />
  }

  // Screen Place
  if (route.indexOf('#/place') > -1) {
    const placeId = route.split('/')[2]
    const params = { placeId }
    return <Place params={params} />
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

