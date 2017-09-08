import React from 'react'
import PageTransition from 'react-router-page-transition'
import { connect } from 'react-redux'

import {
  OnBoarding,
  Main,
  Event,
  Place,
  Category,
  Feed,
  Map,
  Entity,
  Holidays,
  Favs,
} from 'screens'
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

  // All routes
  // @todo: pass to routes config
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
  if (!route || route === '#/' || /main/.test(route) || /feed/.test(route)) {
    const params = {}
    return (
      <Main
        fragment={Feed}
        params={params}
      />
    )
  }

  // Main -> fragment -> Category
  if (/category/.test(route)) {
    const chunks = route.split('/') // #/category/([0-9])/(map|list)
    const categoryId = chunks[2]
    const viewMode = chunks[3]
    const params = { categoryId, viewMode }
    return (<Main
      fragment={Category}
      params={params}
    />)
  }

  // Screen Holidays
  if (/holidays/.test(route)) {
    return <Holidays />
  }

  // Screen Favs
  if (/favs/.test(route)) {
    return <Favs />
  }

  /**
   * General screens
   */
  // Screen Event
  if (/entity/.test(route)) {
    const entityId = route.split('/')[2]
    const params = { entityId }
    return <Entity params={params} />
  }

  // Screen Event
  if (/event/.test(route)) {
    const eventId = route.split('/')[2]
    const params = { eventId }
    return <Event params={params} />
  }

  // Screen Place
  if (/place/.test(route)) {
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

