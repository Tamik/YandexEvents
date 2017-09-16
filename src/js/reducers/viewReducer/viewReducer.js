import { VIEW_SET_VIEW_MODE } from 'consts/actionTypes'
import { VIEW_MODE_LIST } from 'consts/viewModes'

const initialState = {
  viewMode: VIEW_MODE_LIST,
}

/**
 * @function viewReducer
 * @description Редьюсер
 * @param {Object} state
 * @param {Object} action
 * @return {Object}
 */
const viewReducer = (state = initialState, action) => {
  switch (action.type) {
    case VIEW_SET_VIEW_MODE:
      return {
        ...state,
        viewMode: action.viewMode,
      }
    default:
      return state
  }
}

export default viewReducer
