import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import cn from 'classnames'

import { replace } from 'actions/navigationActions'
import { sendModalCategoryData } from 'actions/dataActions'
import { setViewMode } from 'actions/viewActions'
import { VIEW_MODE_LIST, VIEW_MODE_MAP } from 'consts/viewModes'

import { Event, Place, Entity } from 'screens'

import { BottomNav, Map } from 'components'
import { Tabs, Container, FloatingButton, Icon } from 'ui-components'

import styleTabs from 'ui-components/Tabs/style.scss'
import style from './style.scss'

class Main extends Component {
  state = {
    offset: {},
  }

  componentWillMount() {
    this.activeCategoryId = parseInt(this.props.params.categoryId, 10)
    this.viewMode = (this.props.params.viewMode || VIEW_MODE_LIST).toUpperCase()
  }

  viewMainTab = (event) => {
    this.props.onViewMainTab()
    this.activeCategoryId = null

    this.viewMode = VIEW_MODE_LIST

    const offsetLeft = event.target.offsetLeft
    const offsetWidth = event.target.offsetWidth

    this.setState({
      offset: {
        transform: `translate3d(${offsetLeft}px, 0, 0)`,
        width: offsetWidth - 16,
      },
    })
  }

  viewCategory = (categoryData, event, lastChild) => {
    this.props.onViewCategory(categoryData)
    this.activeCategoryId = parseInt(categoryData.id, 10)

    this.activeTabName = null

    const offsetLeft = event.target.offsetLeft
    let offsetWidth = event.target.offsetWidth

    if (lastChild) {
      offsetWidth -= 16
    }

    this.setState({
      offset: {
        transform: `translate3d(${offsetLeft}px, 0, 0)`,
        width: offsetWidth - 16,
      },
    })
  }

  toggleViewMode = () => {
    this.viewMode = this.viewMode === VIEW_MODE_LIST ? VIEW_MODE_MAP : VIEW_MODE_LIST

    let paramsRoute = null
    if (this.props.params.categoryId === undefined) {
      paramsRoute = '/feed'
    }
    else {
      paramsRoute = this.props.params.categoryId
    }
    this.props.onViewModeChanged(
      paramsRoute,
      this.viewMode
    )
  }

  render() {
    return (
      <div className='screen'>
        <Tabs
          className={styleTabs.tabs}
          style={{ ...this.props.data.configData.params.style.tabs }}
        >
          <div style={{ position: 'relative' }}>
            <div
              style={{
                width: 74,
                height: 2,
                position: 'absolute',
                right: 0,
                left: 16,
                bottom: 0,
                backgroundColor: '#1e1367',
                transform: 'translate3d(0, 0, 0)',
                transition: 'transform 250ms, width 100ms ease-in-out',
                ...this.state.offset,
              }}
            />
          </div>
          { /* Main tab */}
          <div
            role='button'
            className={`${styleTabs.tabs__item} ${this.activeTabName === 'feed' ? styleTabs.ta1bs__item_active : ''}`}
            onClick={(event) => {
              this.viewMainTab(event)
            }}
            style={this.props.data.configData.params.style.topBar}
          >{this.props.data.configData.params.mainTabTitle}</div>
          {
            /* Print categories tabs */
            this.props.data.configData.params.categories.map((item, index) => (
              <div
                key={item.id}
                role='button'
                className={`${styleTabs.tabs__item} ${this.activeCategoryId === item.id ? styleTabs.ta1bs__item_active : ''}`}
                onClick={event => this.viewCategory(
                  item,
                  event,
                  this.props.data.configData.params.categories.length === index + 1
                )}
                style={this.props.data.configData.params.style.topBar}
              >{item.title}</div>
            ))
          }
        </Tabs>
        <Container
          scrolling
          stretching
        >
          {
            this.viewMode === VIEW_MODE_LIST
              ? <this.props.fragment params={this.props.params} />
              : <Map categoryId={this.props.params.categoryId} />
          }
        </Container>
        <FloatingButton
          icon={
            <Icon
              type={this.viewMode === VIEW_MODE_LIST ? 'map' : 'list'}
              height='24'
              color='#1e1367'
            />
          }
          title={this.viewMode === VIEW_MODE_LIST ? 'Карта' : 'Список'}
          onClick={this.toggleViewMode}
        />
        <BottomNav />
        {(this.props.data.eventData && this.props.data.eventData !== '__CLOSE__')
          || (this.props.data.placeData && this.props.data.placeData !== '__CLOSE__')
          || (this.props.data.entityData && this.props.data.entityData !== '__CLOSE__')
          ? <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 2000,
            background: '#fff',
            width: '100vw',
            height: '100vh',
          }}
          >
            {this.props.data.eventData ? <Event params={{ eventId: this.props.data.eventData.id }} /> : ''}
            {this.props.data.placeData ? <Place params={{ placeId: this.props.data.placeData.id }} /> : ''}
            {this.props.data.entityData ? <Entity params={{ entityId: this.props.data.entityData.id }} /> : ''}
          </div>
          : ''}
      </div>
    )
  }
}

export default connect(
  state => ({
    router: state.router,
    user: state.user,
    data: state.data,
    view: state.view,
  }),
  dispatch => ({
    onViewMainTab: () => {
      dispatch(replace('/feed'))
    },
    onViewCategory: (categoryData) => {
      dispatch(sendModalCategoryData(categoryData))
      dispatch(replace(`/category/${categoryData.id}/list`))
    },
    onViewModeChanged: (currCategoryId, newViewMode) => {
      dispatch(setViewMode(newViewMode))
      if (currCategoryId === '/feed') {
        dispatch(replace(`/feed/${newViewMode.toLowerCase()}`))
      }
      else {
        dispatch(replace(`/category/${currCategoryId}/${newViewMode.toLowerCase()}`))
      }
    },
  })
)(Main)
