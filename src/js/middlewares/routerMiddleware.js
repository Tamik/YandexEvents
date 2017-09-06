import {
  NAVIGATION_PUSH,
  NAVIGATION_REPLACE,
  NAVIGATION_GO_BACK,
} from 'consts/actionTypes'

const routerMiddleware = history => () => next => (action) => {
  switch (action.type) {
    case NAVIGATION_PUSH:
      return history.push(action.route)
    case NAVIGATION_REPLACE:
      return history.replace(action.route)
    case NAVIGATION_GO_BACK:
      return history.goBack()
    default:
      return next(action)
  }
}

export default routerMiddleware
