import {
  USER_ONBOARDING_VIEWED,
  USER_ADD_TO_FAVORITES,
  USER_DEL_FROM_FAVORITES,
  USER_GET_FAVORITES,
} from 'consts/actionTypes'

/**
 * @function onBoardingViewed
 * @description Экшен
 * @return {Object}
 */
export const onBoardingViewed = () => ({
  type: USER_ONBOARDING_VIEWED,
})

/**
 * @function addToFavorites
 * @description Экшен
 * @param {Object} payload
 * @return {Object}
 */
export const addToFavorites = payload => ({
  type: USER_ADD_TO_FAVORITES,
  event: payload,
})

/**
 * @function delFromFavorites
 * @description Экшен
 * @param {Object} payload 
 * @return {Object}
 */
export const delFromFavorites = payload => ({
  type: USER_DEL_FROM_FAVORITES,
  event: payload,
})

/**
 * @function getFavorites
 * @description Экшен
 * @param {Object} payload
 * @return {Object}
 */
export const getFavorites = payload => ({
  type: USER_GET_FAVORITES,
  favorites: payload,
})
