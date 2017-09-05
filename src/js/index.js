import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import axios from 'axios'

import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import { createHashHistory } from 'history'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'

import routerMiddleware from 'middlewares/routerMiddleware'
import { locationChange } from 'actions/navigationActions'
import rootReducer from 'reducers/rootReducer'

import Application from 'components/Application'

import { sendApplicationConfig } from 'actions/dataActions'

const history = createHashHistory({ hashType: 'slash' })

const middleware = routerMiddleware(history)

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(middleware)
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
  axios.get('http://185.125.219.104:7777/holiconfig?holiday=1')
    .then(response => store.dispatch(sendApplicationConfig(response.data.data)))
  renderApp()
  if (module.hot) {
    module.hot.accept('components/Application', () => {
      const nextApp = require('components/Application').default
      renderApp(nextApp)
    })
  }
}

document.addEventListener('deviceready', onDeviceReady)
