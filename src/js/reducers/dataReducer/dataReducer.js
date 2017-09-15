import {
  DATA_EVENT,
  DATA_CATEGORY,
  DATA_PLACE,
  DATA_ENTITY,
  DATA_CONFIG,
  DATA_EVENT_CLEAR,
  DATA_PLACE_CLEAR,
  DATA_ENTITY_CLEAR,
} from 'consts/actionTypes'

const initialState = {
  eventData: null,
  placeData: null,
  entityData: null,
  categoryData: null,
  configData: null,
}

/**
 * @function dataReducer
 * @description Редьюсер
 * @param {Object} state
 * @param {Object} action
 * @returns {Object}
 */
const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case DATA_EVENT: {
      return {
        ...state,
        eventData: action.eventData,
      }
    }
    case DATA_EVENT_CLEAR: {
      return {
        ...state,
        eventData: '__CLEAR__',
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
    case DATA_PLACE_CLEAR: {
      return {
        ...state,
        placeData: '__CLEAR__',
      }
    }
    case DATA_ENTITY: {
      return {
        ...state,
        entityData: action.entityData,
      }
    }
    case DATA_ENTITY_CLEAR: {
      return {
        ...state,
        entityData: '__CLEAR__',
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
