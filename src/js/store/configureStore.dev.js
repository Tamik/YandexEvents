/* eslint-disable no-underscore-dangle */
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import rootReducer from 'reducers/rootReducer'

export default function configureStore() {
  return createStore(
    rootReducer,
    composeWithDevTools(
      applyMiddleware(thunk)
    )
  )
}
