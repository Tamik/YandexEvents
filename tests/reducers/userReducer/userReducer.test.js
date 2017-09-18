import * as types from 'consts/actionTypes'

import userReducer from 'reducers/userReducer'

describe('Тестирование редьюсера User', () => {
  it('Начальное состояние', () => {
    const action = {}

    expect(userReducer(undefined, action))
      .toEqual({
        firstEnter: true,
        favorites: {},
      })
  })

  it('Обработка экшена USER_ONBOARDING_VIEWED', () => {
    const action = {
      type: types.USER_ONBOARDING_VIEWED,
    }

    expect(userReducer(undefined, action))
      .toEqual({
        firstEnter: false,
        favorites: {},
      })
  })

  it('Обработка экшена USER_ADD_TO_FAVORITES', () => {
    const action = {
      type: types.USER_ADD_TO_FAVORITES,
      event: {
        id: 0,
        test: 'jest',
      },
    }

    expect(userReducer(undefined, action))
      .toEqual({
        firstEnter: true,
        favorites: {
          [action.event.id]: action.event,
        },
      })
  })

  it('Обработка экшена USER_DEL_FROM_FAVORITES', () => {
    const action = {
      type: types.USER_DEL_FROM_FAVORITES,
      event: {
        id: 0,
      },
    }

    expect(userReducer(undefined, action))
      .toEqual({
        firstEnter: true,
        favorites: {},
      })
  })

  it('Обработка экшена USER_GET_FAVORITES', () => {
    const action = {
      type: types.USER_GET_FAVORITES,
      favorites: [1, 2, 3],
    }

    expect(userReducer(undefined, action))
      .toEqual({
        firstEnter: true,
        favorites: action.favorites,
      })
  })
})
