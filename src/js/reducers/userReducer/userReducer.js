const userReducer = (state = { firstEnter: true }, action) => {
  if (action.type === 'FIRST_LOG') {
    const newState = {
      ...state,
      firstEnter: false,
    }
    return newState
  }
  return state
}

export default userReducer
