import {
  USER_ONBOARDING_VIEWED,
  USER_ADD_TO_FAVORITES,
  USER_DEL_FROM_FAVORITES,
  USER_GET_FAVORITES,
} from 'consts/actionTypes'

export const onBoardingViewed = () => ({
  type: USER_ONBOARDING_VIEWED,
})

export const addToFavorites = payload => ({
  type: USER_ADD_TO_FAVORITES,
  event: payload,
})

export const delFromFavorites = payload => ({
  type: USER_DEL_FROM_FAVORITES,
  event: payload,
})

export const getFavorites = payload => ({
  type: USER_GET_FAVORITES,
  favorites: payload,
})
