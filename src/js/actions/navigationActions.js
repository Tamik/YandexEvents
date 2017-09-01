import {
  NAVIGATION_PUSH,
  NAVIGATION_REPLACE,
  NAVIGATION_GO_BACK,
  NAVIGATION_LOCATION_CHANGE,
} from 'consts/actionTypes'

export const push = hash => ({
  type: NAVIGATION_PUSH,
  route: hash,
})

export const replace = hash => ({
  type: NAVIGATION_REPLACE,
  route: hash,
})

export const goBack = () => ({
  type: NAVIGATION_GO_BACK,
})

export const locationChange = hash => ({
  type: NAVIGATION_LOCATION_CHANGE,
  route: hash,
})

export const navigationActions = { push, replace, goBack, locationChange }
