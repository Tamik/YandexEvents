import { combineReducers } from 'redux'
import {
  routerReducer,
  userReducer,
  modalReducer,
  dataReducer,
  viewReducer,
  constructorReducer,
} from 'reducers'

/**
 * @function rootReducer
 * @description Редьюсер, комбинирующий в себе другие редьюсеры
 */
const rootReducer = combineReducers({
  router: routerReducer,
  user: userReducer,
  data: dataReducer,
  modal: modalReducer,
  view: viewReducer,
  constructor: constructorReducer,
})

export default rootReducer
