import * as types from 'consts/actionTypes'

import routerReducer from 'reducers/routerReducer'

describe('Тестирование редьюсера Router', () => {
  it('Начальное состояние', () => {
    const action = {}

    expect(routerReducer(undefined, action))
      .toEqual({
        route: null,
      })
  })

  it('NAVIGATION_LOCATION_CHANGE', () => {
    const action = {
      type: types.NAVIGATION_LOCATION_CHANGE,
      route: '/to/yandex',
    }

    expect(routerReducer(undefined, action))
      .toEqual({
        route: action.route,
      })
  })
})
