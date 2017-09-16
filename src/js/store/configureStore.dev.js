import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import thunk from 'redux-thunk'
import { createHashHistory } from 'history'
import localforage from 'localforage'

import rootReducer from 'reducers/rootReducer'

import routerMiddleware from 'middlewares/routerMiddleware'
import storageMiddleware from 'middlewares/storageMiddleware'

export const history = createHashHistory({ hashType: 'slash' })

export const configureStore = () => (
  createStore(
    rootReducer,
    composeWithDevTools(
      applyMiddleware(
        routerMiddleware(history),
        storageMiddleware(localforage),
        thunk,
      )
    )
  )
)
