import { USER_ONBOARDING_VIEWED, USER_ADD_TO_FAVS, USER_DEL_TO_FAVS } from 'consts/actionTypes'

const storageMiddleware = ls => () => next => (action) => {
  // switch (action.type) {
  //   case PUT_IN_STORAGE:
  //     return ls.setItem(...action.payload)
  //   case REPLACE_IN_STORAGE:
  //     return ls.setItem(...action.payload)
  //   case REMOVE_FROM_STORAGE:
  //     return ls.removeItem(...action.payload)
  //   default:
  //     return next(action)
  // }
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
    case USER_DEL_TO_FAVS:
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
