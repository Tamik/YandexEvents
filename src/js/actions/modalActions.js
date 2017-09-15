/**
 * @function actionViewEvent
 * @description Экшен
 * @param {Object} payload
 * @return {Object}
 * 
 * @deprecated
 */
export const actionViewEvent = payload => ({
  type: 'MODAL_EVENT_VIEW',
  eventData: payload,
})
