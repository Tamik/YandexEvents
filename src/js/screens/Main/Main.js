import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { replace } from 'actions/navigationActions'

import { Container } from 'ui-components'

import style from 'screens/main/style.scss'
import styleTabs from 'ui-components/Tabs/style.scss'

const Main = (props) => {
  const switchToTab = (tabName) => {
    props.onSwitchTab(tabName)
  }

  return (
    <div className='screen'>
      <Container stretching>
        <div className={style['tabs']}>
          <div className={style['tabs__inner']}>
            <div
              role='button'
              onClick={() => {
                switchToTab('feed')
              }}
              className={`${style['tabs__tab']} ${style['tabs__tab_active']}`}
            >Лента</div>
            <div
              role='button'
              onClick={() => {
                switchToTab('map')
              }}
              className={style['tabs__tab']}>Карта</div>
          </div>
        </div>
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
