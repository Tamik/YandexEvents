import { USER_ONBOARDING_VIEWED, USER_ADD_TO_FAVS, USER_DEL_FROM_FAVS } from 'consts/actionTypes'

const storageMiddleware = ls => () => next => (action) => {
  switch (action.type) {
    case USER_ONBOARDING_VIEWED:
      ls.setItem('user', { firstEnter: false })
      return next(action)
    case USER_ADD_TO_FAVS:
      ls.getItem('favs').then((_favs) => {
        const favs = _favs || {}
        favs[action.event.id] = action.event
        ls.setItem('favs', favs)
      })
      return next(action)
    case USER_DEL_FROM_FAVS:
      ls.getItem('favs').then((favs) => {
        delete favs[action.event.id]
        ls.setItem('favs', favs)
      })
      return next(action)
    default:
      return next(action)
  }
}

export default storageMiddleware
