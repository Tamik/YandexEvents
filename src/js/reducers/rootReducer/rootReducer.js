import { combineReducers } from 'redux'
import {
  routerReducer,
  userReducer,
  modalReducer,
  dataReducer,
  viewReducer,
} from 'reducers'

const rootReducer = combineReducers({
  router: routerReducer,
  user: userReducer,
  data: dataReducer,
  modal: modalReducer,
  view: viewReducer,
})

export default rootReducer
