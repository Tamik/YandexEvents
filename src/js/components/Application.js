import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  sendModalEventData,
  sendModalPlaceData,
  sendModalEntityData,
} from 'actions/dataActions'

import {
  OnBoarding,
  Main,
  Event,
  Place,
  Category,
  Feed,
  Entity,
  Holidays,
  Favorites,
} from 'screens'
import './global.scss'

class Application extends Component {
  constructor(props) {
    super(props)
    this.route = props.router ? props.router.route : ''
    this.routeChunks = window.location.hash.replace(/^#\/?|\/$/g, '').split('/')
  }

  shouldComponentUpdate(nextProps) {
    return this.shouldUpdateWhenModal(nextProps)
  }

  componentWillUpdate(nextProps) {
    this.route = nextProps.router ? nextProps.router.route : ''
  }

  /**
   * @method shouldUpdateWhenModal
   * @param {Object} nextProps
   */
  shouldUpdateWhenModal = (nextProps) => {
    const MODALS = ['event', 'place', 'entity']
    let returns = true

    if (/(event|place|entity)/.test(nextProps.router.route)) {
      for (let i = 0; i < MODALS.length; i += 1) {
        if (nextProps.data[`${MODALS[i]}Data`]
          && typeof nextProps.data[`${MODALS[i]}Data`] !== 'string'
          && !nextProps.data[`${MODALS[i]}Data`].notModal) {
          returns = false
        }
        if (nextProps.data[`${MODALS[i]}Data`] === '__CLEAR__') {
          setTimeout(() => {
            this.props.onCloseModal(MODALS[i])
          }, 100)
          returns = false
        }
      }
    }
    else {
      for (let i = 0; i < MODALS.length; i += 1) {
        if (nextProps.data[`${MODALS[i]}Data`]) {
          this.props.onCloseModal(MODALS[i])
        }
      }
    }

    return returns
  }

  render() {
    /**
     * Если пользователь первый раз открыл приложение,
     * то показываем ему OnBoarding
     */
    if (this.props.user.firstEnter) {
      return (<OnBoarding />)
    }
    /**
     * @todo Pass to routes config
     * /
     * /feed
     *  /feed/list
     *  /feed/map
     * /category/:id
     *  /category/:id/list
     *  /category/:id/map
     * /event/:id
     * /place/:id
     * /entity/:id
     * /holidays
     * /favorites
     */
    /** Main -> fragment -> Feed */
    if (!this.route || this.route === '#/' || /main/.test(this.route) || /feed/.test(this.route)) {
      const params = { viewMode: 'list' }
      return (<Main fragment={Feed} params={params} />)
    }
    /** Main -> fragment -> Category */
    if (/category/.test(this.route)) {
      const chunks = this.route.split('/') // #/category/([0-9])/(map|list)
      const categoryId = chunks[2]
      const viewMode = chunks[3]
      const params = { categoryId, viewMode }
      return (<Main fragment={Category} params={params} />)
    }
    /** Holidays screen */
    if (/holidays/.test(this.route)) {
      return (<Holidays />)
    }
    /** Favorites screen */
    if (/favorites/.test(this.route)) {
      return (<Favorites />)
    }
    /** Entity screen */
    if (/entity/.test(this.route)) {
      const entityId = this.route.split('/')[2]
      const params = { entityId }
      return (<Entity params={params} />)
    }
    /** Event screen */
    if (/event/.test(this.route)) {
      const eventId = this.route.split('/')[2]
      const params = { eventId }
      return (<Event params={params} />)
    }
    /** Place screen */
    if (/place/.test(this.route)) {
      const placeId = this.route.split('/')[2]
      const params = { placeId }
      return (<Place params={params} />)
    }
    /** @todo Redirect to Main screen */
    return (<div>Not found.</div>)
  }
}

export default connect(
  state => ({
    user: state.user,
    router: state.router,
    data: state.data,
    view: state.view,
    modalStack: state.modal.stack,
  }),
  dispatch => ({
    onCloseModal: (modal) => {
      dispatch({
        event: sendModalEventData(null),
        place: sendModalPlaceData(null),
        entity: sendModalEntityData(null),
      }[modal])
    },
  })
)(Application)

