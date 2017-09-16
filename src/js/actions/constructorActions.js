import {
  REQUEST_CONTAINER_DATA,
  RECEIVE_CONTAINER_DATA,
} from 'consts/actionTypes'

import { DataApi } from 'utils'

/**
 * @function requestContainerData
 * @description Экшен
 * @return {Object}
 */
export const requestContainerData = () => ({
  type: REQUEST_CONTAINER_DATA,
  // loaded: false,
})

/**
 * @function receiveContainerData
 * @description Экшен, сохраняющий полученные данные в Redux Store
 * @param {Object} payload
 * @param {number|string} key
 * @return {Object}
 */
export const receiveContainerData = (payload, key) => ({
  type: RECEIVE_CONTAINER_DATA,
  [key]: payload,
  // loaded: true,
})

/**
 * @function fetchContainerData
 * @description Экшен, запрашивающий данные с сервера
 * @param {Object} payload
 * @param {number|string} key
 * @return {Object}
 */
export const fetchContainerData = (payload, key) => (dispatch) => {
  dispatch(requestContainerData(key))
  return DataApi
    .prepareQuery(payload)
    .perform()
    .then(response => dispatch(receiveContainerData(response.data.data, key)))
}
