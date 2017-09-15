import { VIEW_SET_VIEW_MODE } from 'consts/actionTypes'

/**
 * @function setViewMode
 * @description Экшен
 * @param {Object} payload ?
 * @return {Object}
 */
export const setViewMode = payload => ({
  type: VIEW_SET_VIEW_MODE,
  viewMode: payload,
})
