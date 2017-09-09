import { USER_ONBOARDING_VIEWED, USER_ADD_TO_FAVS, USER_DEL_TO_FAVS, USER_ADD_FAVS } from 'consts/actionTypes'

export const onBoardingViewed = () => ({
  type: USER_ONBOARDING_VIEWED,
})

export const addToFavs = payload => ({
  type: USER_ADD_TO_FAVS,
  event: payload,
})

export const addFavs = payload => ({
  type: USER_ADD_FAVS,
  favs: payload,
})

export const delToFavs = payload => ({
  type: USER_DEL_TO_FAVS,
  event: payload,
})
