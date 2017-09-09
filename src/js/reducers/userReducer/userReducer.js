import {
  USER_ONBOARDING_VIEWED,
  USER_ADD_TO_FAVS,
  USER_ADD_FAVS,
  USER_DEL_FROM_FAVS,
} from 'consts/actionTypes'

const initState = {
  firstEnter: true,
  favs: {},
}

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case USER_ONBOARDING_VIEWED:
      return {
        ...state,
        firstEnter: false,
      }
    case USER_ADD_TO_FAVS: {
      const id = action.event.id
      const favs = state.favs
      favs[id] = action.event
      return {
        ...state,
        favs,
      }
    }
    case USER_ADD_FAVS: {
      return {
        ...state,
        favs: action.favs || {},
      }
    }
    case USER_DEL_FROM_FAVS: {
      const id = action.event.id
      const favs = state.favs
      delete favs[id]
      return {
        ...state,
        favs,
      }
    }
    default:
      return state
  }
}

export default userReducer
