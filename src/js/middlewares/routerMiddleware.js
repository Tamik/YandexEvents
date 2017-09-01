import {
  NAVIGATION_PUSH,
  NAVIGATION_REPLACE,
  NAVIGATION_GO_BACK,
} from 'consts/actionTypes'

const routerMiddleware = (history) => {
  return () => {
    return (next) => {
      return (action) => {
        switch (action.type) {
          case NAVIGATION_PUSH:
            history.push(action.route)
            break
          case NAVIGATION_REPLACE:
            history.replace(action.route)
            break
          case NAVIGATION_GO_BACK:
            history.goBack()
            break
          default:
            return next(action)
        }
      }
    }
  }
}

export default routerMiddleware
