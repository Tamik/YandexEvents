import * as actions from 'actions/userActions'
import * as types from 'consts/actionTypes'

describe('Тестирование экшенов для редьюсера User', () => {
  it('Экшен onBoardingViewed', () => {
    const expectedAction = {
      type: types.USER_ONBOARDING_VIEWED,
    }

    expect(actions.onBoardingViewed())
      .toEqual(expectedAction)
  })

  it('Экшен addToFavorites', () => {
    const payload = {
      test: 'jest',
    }
    const expectedAction = {
      type: types.USER_ADD_TO_FAVORITES,
      event: payload,
    }

    expect(actions.addToFavorites(payload))
      .toEqual(expectedAction)
  })

  it('Экшен delFromFavorites', () => {
    const payload = {
      test: 'jest',
    }
    const expectedAction = {
      type: types.USER_DEL_FROM_FAVORITES,
      event: payload,
    }

    expect(actions.delFromFavorites(payload))
      .toEqual(expectedAction)
  })

  it('Экшен getFavorites', () => {
    const payload = {
      test: 'jest',
    }
    const expectedAction = {
      type: types.USER_GET_FAVORITES,
      favorites: payload,
    }

    expect(actions.getFavorites(payload))
      .toEqual(expectedAction)
  })
})
