import React from 'react'
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import localforage from 'localforage'
import { shallow } from 'enzyme'

import Map from 'components/Map'

import routerMiddleware from 'middlewares/routerMiddleware'
import storageMiddleware from 'middlewares/storageMiddleware'

import rootReducer from 'reducers/rootReducer'

describe('Тестирование компонента Map', () => {
  it('Рендерится без падения', () => {
    const store = createStore(
      rootReducer,
      applyMiddleware(
        routerMiddleware(history),
        storageMiddleware(localforage),
      )
    )

    shallow(
      <Provider store={store}>
        <Map />
      </Provider>
    )
  })
})
