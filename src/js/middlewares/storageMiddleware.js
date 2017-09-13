import {
  USER_ONBOARDING_VIEWED,
  USER_ADD_TO_FAVORITES,
  USER_DEL_FROM_FAVORITES,
} from 'consts/actionTypes'

const storageMiddleware = ls => () => next => (action) => {
  switch (action.type) {
    case USER_ONBOARDING_VIEWED:
      ls.setItem('user', { firstEnter: true })
      return next(action)
    case USER_ADD_TO_FAVORITES:
      ls.getItem('favorites').then((_favorites) => {
        const favorites = _favorites || {}
        favorites[action.event.id] = action.event
        ls.setItem('favorites', favorites)
      })
      return next(action)
    case USER_DEL_FROM_FAVORITES:
      ls.getItem('favorites').then((favorites) => {
        const newFavorites = favorites
        delete newFavorites[action.event.id]
        ls.setItem('favorites', newFavorites)
      })
      return next(action)
    default:
      return next(action)
  }
}

export default storageMiddleware
