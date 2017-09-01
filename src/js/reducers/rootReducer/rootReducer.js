import { combineReducers } from 'redux'
import {
  routerReducer,
  userReducer,
  modalReducer,
  dataReducer,
} from 'reducers'

const rootReducer = combineReducers({
  router: routerReducer,
  user: userReducer,
  data: dataReducer,
  modal: modalReducer,
})

export default rootReducer
