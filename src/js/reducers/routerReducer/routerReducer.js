import { NAVIGATION_LOCATION_CHANGE } from 'consts/actionTypes'

const initialState = {
  route: null,
}

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
