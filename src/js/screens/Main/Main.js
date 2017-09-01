import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { replace } from 'actions/navigationActions'

import { Tabs, Container } from 'ui-components'

import style from 'screens/main/style.scss'
import styleTabs from 'ui-components/Tabs/style.scss'

const Main = (props) => {
  const activeTabName = props.router.route.slice(2)
  const switchToTab = (tabName) => {
    props.onSwitchTab(tabName)
  }


  return (
    <div className='screen'>
      <Container stretching>
        <Tabs>
          <div
            role='button'
            className={`${styleTabs.tabs__item} ${activeTabName === 'feed' ? styleTabs.tabs__item_active : ''}`}
            onClick={() => {
              switchToTab('feed')
            }}
          >Лента</div>
          <div
            role='button'
            className={`${styleTabs.tabs__item} ${activeTabName === 'map' ? styleTabs.tabs__item_active : ''}`}
            onClick={() => {
              switchToTab('map')
            }}
          >Карта</div>
        </Tabs>
        <Container scrolling stretching>
          <props.fragment />
        </Container>
      </Container>
    </div>
  )
}

export default connect(
  state => ({
    router: state.router,
    user: state.user,
    data: state.data,
  }),
  dispatch => ({
    onSwitchTab: (tabName) => {
      dispatch(replace(`/${tabName}`))
    },
  })
)(Main)
