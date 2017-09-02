import { DATA_EVENT, DATA_CATEGORY, DATA_PLACE } from 'consts/actionTypes'

const initialState = {
  eventData: null,
  categoryData: null,
  placeData: null,
}

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case DATA_EVENT: {
      return {
        ...state,
        eventData: action.eventData,
      }
    }
    case DATA_CATEGORY: {
      return {
        ...state,
        categoryData: action.categoryData,
      }
    }
    case DATA_PLACE: {
      return {
        ...state,
        placeData: action.placeData,
      }
    }
    default:
      return state
  }
}

export default dataReducer
