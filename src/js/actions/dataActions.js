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

/**
 * @function sendModalEventData
 * @description Экшен
 * @param {Object} payload
 * @return {Object}
 */
export const sendModalEventData = payload => ({
  type: DATA_EVENT,
  eventData: payload,
})

/**
 * @function clearModalEventData
 * @description Экшен
 * @return {Object}
 */
export const clearModalEventData = () => ({
  type: DATA_EVENT_CLEAR,
})

/**
 * @function sendModalCategoryData
 * @description Экшен
 * @param {Object} payload
 * @return {Object}
 */
export const sendModalCategoryData = payload => ({
  type: DATA_CATEGORY,
  categoryData: payload,
})

/**
 * @function clearModalCategoryData
 * @description Экшен
 * @return {Object}
 */
export const clearModalCategoryData = () => ({
  type: DATA_CATEGORY,
})

/**
 * @function sendModalPlaceData
 * @description Экшен
 * @param {Object} payload
 * @return {Object}
 */
export const sendModalPlaceData = payload => ({
  type: DATA_PLACE,
  placeData: payload,
})

/**
 * @function clearModalPlaceData
 * @description Экшен
 * @return {Object}
 */
export const clearModalPlaceData = () => ({
  type: DATA_PLACE_CLEAR,
})

/**
 * @function sendModalEntityData
 * @description Экшен
 * @param {Object} payload
 * @return {Object}
 */
export const sendModalEntityData = payload => ({
  type: DATA_ENTITY,
  entityData: payload,
})

/**
 * @function clearModalEntityData
 * @description Экшен
 * @return {Object}
 */
export const clearModalEntityData = () => ({
  type: DATA_ENTITY_CLEAR,
})

/**
 * @function sendApplicationConfig
 * @description Экшен
 * @param {Object} payload
 * @return {Object}
 */
export const sendApplicationConfig = payload => ({
  type: DATA_CONFIG,
  configData: payload,
})
