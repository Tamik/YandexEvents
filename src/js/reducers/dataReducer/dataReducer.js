import { DATA_EVENT, DATA_CATEGORY, DATA_PLACE, DATA_ENTITY, DATA_CONFIG } from 'consts/actionTypes'

const initialState = {
  eventData: null,
  categoryData: null,
  placeData: null,
  entityData: null,
  configData: null,
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
    case DATA_ENTITY: {
      return {
        ...state,
        entityData: action.entityData,
      }
    }
    case DATA_CONFIG: {
      return {
        ...state,
        configData: action.configData,
      }
    }
    default:
      return state
  }
}

export default dataReducer
