import {
  REQUEST_CONTAINER_DATA,
  RECEIVE_CONTAINER_DATA,
} from 'consts/actionTypes'

import { DataApi } from 'utils'

export const requestContainerData = () => ({
  type: REQUEST_CONTAINER_DATA,
  // loaded: false,
})

export const receiveContainerData = (payload, key) => ({
  type: RECEIVE_CONTAINER_DATA,
  [key]: payload,
  // loaded: true,
})

export const fetchContainerData = (payload, key) => (dispatch) => {
  dispatch(requestContainerData(key))
  return DataApi
    .prepareQuery(payload)
    .perform()
    .then(response => dispatch(receiveContainerData(response.data.data, key)))
}
