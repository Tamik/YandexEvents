import * as actions from 'actions/viewActions'
import * as types from 'consts/actionTypes'

describe('Тестирование экшенов для редьюсера View', () => {
  it('Экшен setViewMode', () => {
    const payload = 'jest'
    const expectedAction = {
      type: types.VIEW_SET_VIEW_MODE,
      viewMode: payload,
    }

    expect(actions.setViewMode(payload))
      .toEqual(expectedAction)
  })
})
