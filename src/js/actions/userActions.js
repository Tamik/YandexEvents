import {
  USER_ONBOARDING_VIEWED,
  USER_ADD_TO_FAVORITES,
  USER_DEL_FROM_FAVORITES,
  USER_GET_FAVORITES,
} from 'consts/actionTypes'

/**
 * @function onBoardingViewed
 * @description Экшен, проверяющий, видел ли пользователь онбординг
 * @return {Object}
 */
export const onBoardingViewed = () => ({
  type: USER_ONBOARDING_VIEWED,
})

/**
 * @function addToFavorites
 * @description Экшен, добавляющий сущность в коллекцию (закладки)
 * @param {Object} payload
 * @return {Object}
 */
export const addToFavorites = payload => ({
  type: USER_ADD_TO_FAVORITES,
  event: payload,
})

/**
 * @function delFromFavorites
 * @description Экшен, удаляющий сущность из коллекции (закладки)
 * @param {Object} payload 
 * @return {Object}
 */
export const delFromFavorites = payload => ({
  type: USER_DEL_FROM_FAVORITES,
  event: payload,
})

/**
 * @function getFavorites
 * @description Экшен, запрашивающий сущности в коллекции
 * @param {Object} payload
 * @return {Object}
 */
export const getFavorites = payload => ({
  type: USER_GET_FAVORITES,
  favorites: payload,
})
