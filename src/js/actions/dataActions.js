import {
  DATA_EVENT,
  DATA_CATEGORY,
  DATA_PLACE,
  DATA_ENTITY,
  DATA_CONFIG,
  DATA_EVENT_CLEAR,
} from 'consts/actionTypes'

export const sendModalEventData = payload => ({
  type: DATA_EVENT,
  eventData: payload,
})

export const clearModalEventData = payload => ({
  type: DATA_EVENT_CLEAR,
})

export const sendModalCategoryData = payload => ({
  type: DATA_CATEGORY,
  categoryData: payload,
})

export const sendModalPlaceData = payload => ({
  type: DATA_PLACE,
  placeData: payload,
})

export const sendModalEntityData = payload => ({
  type: DATA_ENTITY,
  entityData: payload,
})

export const sendApplicationConfig = payload => ({
  type: DATA_CONFIG,
  configData: payload,
})
