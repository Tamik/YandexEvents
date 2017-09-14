import React from 'react'
import { connect } from 'react-redux'
import ClassNames from 'classnames'

import { replace } from 'actions/navigationActions'

import { BottomNavigation, Icon } from 'ui-components'

import styleBottomNavigation from 'ui-components/BottomNavigation/style.scss'

const BottomNav = (props) => {
  const route = props.route || ''

  const isActiveTabNow = /feed/.test(route) || /category/.test(route) || route === '#/' || !route
  const isActiveTabHolidays = /holidays/.test(route)
  const isActiveTabFavorites = /favorites/.test(route)

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
        className={
          ClassNames(
            styleBottomNavigation.BottomNavigation__item,
            isActiveTabNow ? styleBottomNavigation.BottomNavigation__item_active : '',
          )}
      >
        <Icon
          type={isActiveTabNow ? 'eventFill' : 'event'}
          height='20'
        />
        День Города
      </div>
      <div
        role='button'
        onClick={() => {
          tabSwitch('holidays')
        }}
        className={
          ClassNames(
            styleBottomNavigation.BottomNavigation__item,
            isActiveTabHolidays ? styleBottomNavigation.BottomNavigation__item_active : '',
          )}
      >
        <Icon
          type={isActiveTabHolidays ? 'starFill' : 'star'}
          height='20'
        />
        Все праздники
      </div>
      <div
        role='button'
        onClick={() => {
          tabSwitch('favorites')
        }}
        className={
          ClassNames(
            styleBottomNavigation.BottomNavigation__item,
            isActiveTabFavorites ? styleBottomNavigation.BottomNavigation__item_active : '',
          )}
      >
        <Icon
          type={isActiveTabFavorites ? 'bookmarkFill' : 'bookmark'}
          height='20'
          color={isActiveTabFavorites ? '#333' : '#777'}
        />
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
