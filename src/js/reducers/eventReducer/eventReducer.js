const eventReducer = (state = { event: {} }, action) => {
/**
 * @function eventReducer
 * @description Редьюсер
 * @param {Object} state
 * @param {Object} action
 * @returns {Object}
 */
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
