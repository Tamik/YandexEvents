import React from 'react'
import { connect } from 'react-redux'

import { replace } from 'actions/navigationActions'

import { BottomNavigation, Icon } from 'ui-components'

import styleBotNav from 'ui-components/BottomNavigation/style.scss'

const BottomNav = (props) => {
  const route = props.route || ''

  const isActiiveTabNow = /feed/.test(route) || /category/.test(route) || route === '#/' || !route
  const isActiiveTabHolidays = /holidays/.test(route)
  const isActiiveTabFavs = /favs/.test(route)

  const tabSwitch = (tab) => {
    props.onTabSwitch(`/${tab}`)
  }

  return (
    <BottomNavigation>
      <div
        role='button'
        onClick={() => {
          tabSwitch('feed')
        }}
        className={`${styleBotNav.botNav__item} ${isActiiveTabNow ? styleBotNav.botNav__item_active : ''}`}
      >
        <Icon type='event' height='20' />
        День Города
      </div>
      <div
        role='button'
        onClick={() => {
          tabSwitch('holidays')
        }}
        className={`${styleBotNav.botNav__item} ${isActiiveTabHolidays ? styleBotNav.botNav__item_active : ''}`}
      >
        <Icon type='star' height='20' />
        Все праздники
      </div>
      <div
        role='button'
        onClick={() => {
          tabSwitch('favs')
        }}
        className={`${styleBotNav.botNav__item} ${isActiiveTabFavs ? styleBotNav.botNav__item_active : ''}`}
      >
        <Icon type='bookmark' height='20' />
        Закладки
      </div>
    </BottomNavigation>
  )
}

export default connect(
  state => ({
    route: state.router.route,
  }),
  dispatch => ({
    onTabSwitch: (route) => {
      dispatch(replace(route))
    },
  })
)(BottomNav)
