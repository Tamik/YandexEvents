import {
  USER_ONBOARDING_VIEWED,
  USER_ADD_TO_FAVORITES,
  USER_DEL_FROM_FAVORITES,
  USER_GET_FAVORITES,
} from 'consts/actionTypes'

const initialState = {
  firstEnter: true,
  favorites: {},
}

/**
 * @function userReducer
 * @description Редьюсер
 * @param {Object} state
 * @param {Object} action
 * @return {Object}
 */
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_ONBOARDING_VIEWED:
      return {
        ...state,
        firstEnter: false,
      }
    case USER_ADD_TO_FAVORITES: {
      const id = action.event.id
      const favorites = state.favorites
      favorites[id] = action.event
      return {
        ...state,
        favorites,
      }
    }
    case USER_DEL_FROM_FAVORITES: {
      const id = action.event.id
      const favorites = state.favorites
      delete favorites[id]
      return {
        ...state,
        favorites,
      }
    }
    case USER_GET_FAVORITES: {
      return {
        ...state,
        favorites: action.favorites || {},
      }
    }
    default:
      return state
  }
}

export default userReducer
