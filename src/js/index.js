/* global cordova */
/* global StatusBar */
import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import localforage from 'localforage'
import FastClick from 'fastclick'
import { Provider } from 'react-redux'

import { sendApplicationConfig, sendModalEventData } from 'actions/dataActions'
import { locationChange } from 'actions/navigationActions'
import { onBoardingViewed, getFavorites } from 'actions/userActions'

import Application from 'components/Application'

import { configureStore, history } from 'store/configureStore'

import { DataApi } from 'utils'

const store = configureStore()

const renderApp = () => {
  render(
    <AppContainer>
      <Provider store={store}>
        <Application />
      </Provider>
    </AppContainer>,
    document.getElementById('react-root')
  )
}

/** Current location dispatch */
store.dispatch(
  locationChange(window.location.hash)
)

let prevHash = window.location.hash

history.listen((location) => {
  const hash = `#${location.pathname}`

  if (/(place|entity)/.test(hash) && /event/.test(prevHash)) {
    store.dispatch(sendModalEventData(null))
  }

  store.dispatch(
    locationChange(hash)
  )
  prevHash = hash
})

function onDeviceReady() {
  FastClick.attach(document.body)
  const config = {
    AppMetrica: {
      apiKey: process.env.APM_KEY,
      trackLocationEnabled: true,
      handleFirstActivationAsUpdateEnabled: true,
      sessionTimeout: 15,
      appVersion: process.env.APM_VERSION,
    },
  }
  window.appMetrica.activate(config.AppMetrica)

  if (cordova.platformId === 'ios' || cordova.platformId === 'android') {
    StatusBar.styleDefault()
  }

  DataApi.getHolidayConfig()
    .byHoliday(1)
    .perform()
    .then(response => store.dispatch(sendApplicationConfig(response.data.data)))
    .then(() => {
      localforage.getItem('user')
        .then(response => !response.firstEnter && store.dispatch(onBoardingViewed()))
      localforage.getItem('favorites')
        .then((response) => {
          store.dispatch(getFavorites(response))
        })
      renderApp()
    })
  if (module.hot) {
    module.hot.accept('components/Application', () => {
      const nextApp = require('components/Application').default
      renderApp(nextApp)
    })
  }
}

document.addEventListener('deviceready', onDeviceReady)
