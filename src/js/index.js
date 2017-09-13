import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import localforage from 'localforage'

import FastClick from 'fastclick'

import { DataApi } from 'utils'

import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import { createHashHistory } from 'history'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'

import routerMiddleware from 'middlewares/routerMiddleware'
import storageMiddleware from 'middlewares/storageMiddleware'
import { sendApplicationConfig, sendModalEventData } from 'actions/dataActions'
import { locationChange } from 'actions/navigationActions'
import { onBoardingViewed, getFavorites } from 'actions/userActions'
import rootReducer from 'reducers/rootReducer'

import Application from 'components/Application'

const history = createHashHistory({ hashType: 'slash' })

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      routerMiddleware(history),
      storageMiddleware(localforage),
    )
  )
)

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

// Current location displatch
store.dispatch(
  locationChange(window.location.hash)
)

// Listen store and render page on storeUpdate
store.subscribe(() => {
  // @todo: improve for chunked rendering
  // renderApp()
})

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
