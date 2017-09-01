import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import { combineReducers, applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import { createHashHistory } from 'history'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'

import routerMiddleware from 'middlewares/routerMiddleware'
import { locationChange } from 'actions/navigationActions'
import {
  routerReducer,
  userReducer,
  modalReducer,
  dataReducer,
} from 'reducers'

import Application from 'components/Application'

const history = createHashHistory({ hashType: 'slash' })

// @todo: pass to splitted file
const rootReducer = combineReducers({
  router: routerReducer,
  user: userReducer,
  data: dataReducer,
  modal: modalReducer,
})

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
  renderApp()
  if (module.hot) {
    module.hot.accept('components/Application', () => {
      const nextApp = require('components/Application').default
      renderApp(nextApp)
    })
  }
}

document.addEventListener('deviceready', onDeviceReady)
