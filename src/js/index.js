import React from 'react'
import { render } from 'react-dom'
import { HashRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'

import Application from 'components/Application'
import configureStore from 'store/configureStore'

function renderApp(Component) {
  const store = configureStore()

  render(
    <AppContainer>
      <Provider store={store}>
        <Router>
          <Application />
        </Router>
      </Provider>
    </AppContainer>,
    document.getElementById('App')
  )
}

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
