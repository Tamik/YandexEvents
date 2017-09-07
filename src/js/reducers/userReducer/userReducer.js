import { USER_ONBOARDING_VIEWED, USER_ADD_TO_FAVS } from 'consts/actionTypes'

const initState = {
  firstEnter: true,
}

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case USER_ONBOARDING_VIEWED:
      return {
        ...state,
        firstEnter: false,
      }
    case USER_ADD_TO_FAVS: {
      return {
        ...state,
        favs: action.favs,
      }
    }
    default:
      return state
  }
}

export default userReducer
