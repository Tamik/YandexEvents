import * as actions from 'actions/navigationActions'
import * as types from 'consts/actionTypes'

describe('Тестирование экшенов для редьюсера Router', () => {
  it('Экшен push', () => {
    const hash = '#/route/'
    const expectedAction = {
      type: types.NAVIGATION_PUSH,
      route: hash,
    }

    expect(actions.push(hash))
      .toEqual(expectedAction)
  })

  it('Экшен replace', () => {
    const hash = '#/route/'
    const expectedAction = {
      type: types.NAVIGATION_REPLACE,
      route: hash,
    }

    expect(actions.replace(hash))
      .toEqual(expectedAction)
  })

  it('Экшен goBack', () => {
    const expectedAction = {
      type: types.NAVIGATION_GO_BACK,
    }

    expect(actions.goBack())
      .toEqual(expectedAction)
  })

  it('Экшен locationChange', () => {
    const hash = '#/route/'
    const expectedAction = {
      type: types.NAVIGATION_LOCATION_CHANGE,
      route: hash,
    }

    expect(actions.locationChange(hash))
      .toEqual(expectedAction)
  })
})
