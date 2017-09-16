import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createHashHistory } from 'history'
import localforage from 'localforage'

import rootReducer from 'reducers/rootReducer'

import routerMiddleware from 'middlewares/routerMiddleware'
import storageMiddleware from 'middlewares/storageMiddleware'

const history = createHashHistory({ hashType: 'slash' })

const configureStore = () => (
  createStore(
    rootReducer,
    applyMiddleware(
      routerMiddleware(history),
      storageMiddleware(localforage),
      thunk,
    )
  )
)

export default configureStore
