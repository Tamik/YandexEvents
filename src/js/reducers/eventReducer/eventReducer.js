const eventReducer = (state = { event: {} }, action) => {
  if (action.type === 'SEND_TO_EVENT') {
    const newState = {
      ...state,
      event: action.payload,
    }
    return newState
  }
  return state
}

export default eventReducer
