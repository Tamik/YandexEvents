import { USER_ONBOARDING_VIEWED, USER_ADD_TO_FAVS } from 'consts/actionTypes'

export const onBoardingViewed = () => ({
  type: USER_ONBOARDING_VIEWED,
})

export const addToFavs = payload => ({
  type: USER_ADD_TO_FAVS,
  favs: payload,
})
