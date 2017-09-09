import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { replace } from 'actions/navigationActions'
import { sendModalCategoryData } from 'actions/dataActions'

import { BottomNav } from 'components'
import { Tabs, Container } from 'ui-components'

import style from 'screens/main/style.scss'
import styleTabs from 'ui-components/Tabs/style.scss'

class Main extends Component {
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

  render() {
    return (
      <div className='screen'>
        <Tabs style={{ ...this.props.data.configData.params.style.topBar }}>
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
                className={`${styleTabs.tabs__item} ${this.activeCategoryId == item.id ? styleTabs.tabs__item_active : ''}`}
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
          <this.props.fragment params={this.props.params} view={this.props.view} />
        </Container>
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
  })
)(Main)
