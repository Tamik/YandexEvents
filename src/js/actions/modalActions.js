import { MODAL_EVENT_VIEW } from 'consts/actionTypes'

export const actionViewEvent = (payload) => {
  return {
    type: MODAL_EVENT_VIEW,
    eventData: payload,
  }
}
