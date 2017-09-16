import { NAVIGATION_LOCATION_CHANGE } from 'consts/actionTypes'

const initialState = {
  route: null,
}

/**
 * @function routerReducer
 * @description Редьюсер
 * @param {Object} state
 * @param {Object} action
 * @return {Object}
 */
const routerReducer = (state = initialState, action) => {
  switch (action.type) {
    case NAVIGATION_LOCATION_CHANGE:
      return {
        ...state,
        route: action.route,
      }
    default:
      return state
  }
}

export default routerReducer
