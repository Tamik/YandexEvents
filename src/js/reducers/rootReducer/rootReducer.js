import { combineReducers } from 'redux'
import { userReducer, eventReducer } from 'reducers'

const rootReducer = combineReducers({
  userStore: userReducer,
  eventStore: eventReducer,
})

export default rootReducer
