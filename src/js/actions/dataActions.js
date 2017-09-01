import { DATA_EVENT, DATA_CATEGORY, DATA_PLACE } from 'consts/actionTypes'

export const sendModalEventData = (payload) => {
  return {
    type: DATA_EVENT,
    eventData: payload,
  }
}

export const sendModalCategoryData = (payload) => {
  return {
    type: DATA_CATEGORY,
    categoryData: payload,
  }
}

export const sendModalPlaceData = (payload) => {
  return {
    type: DATA_PLACE,
    placeData: payload,
  }
}
