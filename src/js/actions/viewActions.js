import { VIEW_SET_VIEW_MODE } from 'consts/actionTypes'

export const setViewMode = payload => ({
  type: VIEW_SET_VIEW_MODE,
  viewMode: payload,
})

