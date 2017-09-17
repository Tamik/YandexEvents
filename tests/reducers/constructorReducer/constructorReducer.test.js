import * as types from 'consts/actionTypes'

import constructorReducer from 'reducers/constructorReducer'

describe('Тестирование редьюсера Constructor', () => {
  it('Начальное состояние', () => {
    const action = {}

    expect(constructorReducer(undefined, action))
      .toEqual({
        constructorData: {},
      })
  })

  it('Получение данных', () => {
    const action = {
      type: types.RECEIVE_CONTAINER_DATA,
      1: {
        test: 'jest',
      },
    }

    expect(constructorReducer(undefined, action))
      .toEqual({
        constructorData: {},
        ...action,
      })
  })
})
