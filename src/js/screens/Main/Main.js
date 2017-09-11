import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { replace } from 'actions/navigationActions'
import { sendModalCategoryData } from 'actions/dataActions'
import { setViewMode } from 'actions/viewActions'
import { VIEW_MODE_LIST, VIEW_MODE_MAP } from 'consts/viewModes'

import { Event } from 'screens'

import { BottomNav, Map } from 'components'
import { Tabs, Container, FloatingButton, Icon } from 'ui-components'

import styleTabs from 'ui-components/Tabs/style.scss'
import style from './style.scss'

class Main extends Component {
  componentWillMount() {
    this.activeCategoryId = parseInt(this.props.params.categoryId, 10)
    this.viewMode = (this.props.params.viewMode || VIEW_MODE_LIST).toUpperCase()
  }

  viewMainTab = () => {
    this.props.onViewMainTab()
    this.activeCategoryId = null
    this.viewMode = VIEW_MODE_LIST
  }

  viewCategory = (categoryData) => {
    this.props.onViewCategory(categoryData)
    this.activeCategoryId = parseInt(categoryData.id, 10)
  }

  toggleViewMode = () => {
    this.viewMode = this.viewMode === VIEW_MODE_LIST ? VIEW_MODE_MAP : VIEW_MODE_LIST
    this.props.onViewModeChanged(
      this.props.params.categoryId,
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
          { /* Main tab */}
          <div
            role='button'
            className={`${styleTabs.tabs__item} ${!this.activeCategoryId ? styleTabs.tabs__item_active : ''}`}
            onClick={() => {
              this.viewMainTab()
            }}
            style={this.props.data.configData.params.style.topBar}
          >{this.props.data.configData.params.mainTabTitle}</div>
          {
            /* Print categories tabs */
            this.props.data.configData.params.categories.map(item => (
              <div
                key={item.id}
                role='button'
                className={`${styleTabs.tabs__item} ${this.activeCategoryId === parseInt(item.id, 10) ? styleTabs.tabs__item_active : ''}`}
                onClick={() => this.viewCategory(item)}
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
        {this.props.params.categoryId
          ? <FloatingButton
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
          : ''}
        <BottomNav />
        {this.props.data.eventData && this.props.data.eventData !== '__CLOSE__'
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
            <Event params={{ eventId: this.props.data.eventData.id }} />
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
      dispatch(replace(`/category/${currCategoryId}/${newViewMode.toLowerCase()}`))
    },
  })
)(Main)
