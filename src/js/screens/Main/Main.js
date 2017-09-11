import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { replace } from 'actions/navigationActions'
import { sendModalCategoryData } from 'actions/dataActions'
import { setViewMode } from 'actions/viewActions'
import { VIEW_MODE_LIST, VIEW_MODE_MAP } from 'consts/viewModes'

import { BottomNav, Map } from 'components'
import { Tabs, Container, FloatingButton } from 'ui-components'

import styleTabs from 'ui-components/Tabs/style.scss'
import style from './style.scss'

class Main extends Component {
  constructor(props) {
    super(props)

    this.viewMode = this.props.params.viewMode.toUpperCase()
  }

  activeTabName = this.props.router.route.slice(2)
  activeCategoryId = parseInt(this.props.params.categoryId, 10)

  viewMainTab = () => {
    this.props.onViewMainTab()
    this.activeTabName = 'feed'
    this.activeCategoryId = null
  }

  viewCategory = (categoryData) => {
    this.props.onViewCategory(categoryData)
    this.activeTabName = null
    this.activeCategoryId = categoryData.id
  }

  viewMode = this.props.params.viewMode.toUpperCase()

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
        <Tabs style={{ ...this.props.data.configData.params.style.tabs }}>
          { /* Main tab */}
          <div
            role='button'
            className={`${styleTabs.tabs__item} ${this.activeTabName === 'feed' ? styleTabs.tabs__item_active : ''}`}
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
                className={`${styleTabs.tabs__item} ${this.activeCategoryId === item.id ? styleTabs.tabs__item_active : ''}`}
                onClick={() => this.viewCategory(item)}
                style={this.props.data.configData.params.style.topBar}
              >{item.title}</div>
            )
            )
          }
        </Tabs>
        <Container
          scrolling
          stretching
        >
          {
            this.viewMode === VIEW_MODE_LIST
              ? <this.props.fragment params={this.props.params} view={this.props.view}/>
              : <Map categoryId={this.props.params.categoryId} />
          }
        </Container>
        <FloatingButton
          typeIcon={this.viewMode === VIEW_MODE_LIST ? 'map' : 'list'}
          title={this.viewMode === VIEW_MODE_LIST ? 'Карта' : 'Список'}
          onClick={this.toggleViewMode}
        />
        <BottomNav />
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
