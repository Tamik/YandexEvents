import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import localforage from 'localforage'
import axios from 'axios'

import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import { createHashHistory } from 'history'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'

import routerMiddleware from 'middlewares/routerMiddleware'
import storageMiddleware from 'middlewares/storageMiddleware'
import { sendApplicationConfig } from 'actions/dataActions'
import { locationChange } from 'actions/navigationActions'
import { onBoardingViewed } from 'actions/userActions'
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
    document.getElementById('App')
  )
}

// Current location displatch
store.dispatch(
  locationChange(window.location.hash)
)

// Listen store and render page on storeUpdate
store.subscribe(() => {
  // @todo: improve for chunked rendering
  renderApp()
})

history.listen((location) => {
  const hash = `#${location.pathname}`
  store.dispatch(
    locationChange(hash)
  )
})

function onDeviceReady() {
  axios.get('http://static.yamblz.ru/response.json')
    .then(response => store.dispatch(sendApplicationConfig(response.data.data)))
    .then(() => {
      localforage.getItem('user')
        .then(response => !response.firstEnter && store.dispatch(onBoardingViewed()))
    })
  renderApp()
  if (module.hot) {
    module.hot.accept('components/Application', () => {
      const nextApp = require('components/Application').default
      renderApp(nextApp)
    })
  }
}

document.addEventListener('deviceready', onDeviceReady)
