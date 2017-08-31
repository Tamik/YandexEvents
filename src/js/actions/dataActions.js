import { DATA_EVENT } from 'consts/actionTypes'

export const sendModalEventData = (payload) => {
  return {
    type: DATA_EVENT,
    eventData: payload,
  }
}
