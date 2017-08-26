import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { MainReducer } from 'reducers'

export default function configureStore() {
  return createStore(
    MainReducer,
    applyMiddleware(thunk)
  )
}
