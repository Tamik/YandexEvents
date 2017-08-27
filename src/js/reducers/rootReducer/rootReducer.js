import { combineReducers } from 'redux'
import { userReducer } from 'reducers'

const rootReducer = combineReducers({
  userStore: userReducer,
})

export default rootReducer
