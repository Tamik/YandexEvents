import { USER_ONBOARDING_VIEWED } from 'consts/actionTypes'

const initState = {
  firstEnter: true,
}
const userReducer = (state = initState, action) => {
  switch (action.type) {
    case USER_ONBOARDING_VIEWED: {
      const newState = {
        ...state,
        firstEnter: false,
      }
      return newState
    }
    default:
      return state
  }
}

export default userReducer
