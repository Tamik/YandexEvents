import {
  REQUEST_CONTAINER_DATA,
  RECEIVE_CONTAINER_DATA,
} from 'consts/actionTypes'

const initialState = {
  constructorData: {},
}

/**
 * @function constructorReducer
 * @description Редьюсер работающий с Конструктором
 * @param {Object} state
 * @param {Object} action
 * @return {Object}
 */
const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    // case REQUEST_CONTAINER_DATA: return {
    //   ...state,
    // }
    case RECEIVE_CONTAINER_DATA: return {
      ...state,
      ...action,
    }
    default: return state
  }
}

export default constructorReducer
