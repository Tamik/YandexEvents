import { DATA_EVENT } from 'consts/actionTypes'

const initialState = {
  eventData: null,
}

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case DATA_EVENT: {
      return {
        ...state,
        eventData: action.payload,
      }
    }
    default:
      return state
  }
}

export default dataReducer
