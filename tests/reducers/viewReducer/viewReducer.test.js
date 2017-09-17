import * as types from 'consts/actionTypes'
import * as viewTypes from 'consts/viewModes'

import viewReducer from 'reducers/viewReducer'

describe('Тестирование редьюсера View', () => {
  it('Начальное состояние', () => {
    const action = {}

    expect(viewReducer(undefined, action))
      .toEqual({
        viewMode: viewTypes.VIEW_MODE_LIST,
      })
  })

  it('Обработка экшена VIEW_SET_VIEW_MODE', () => {
    const action = {
      type: types.VIEW_SET_VIEW_MODE,
      viewMode: viewTypes.VIEW_MODE_MAP,
    }

    expect(viewReducer(undefined, action))
      .toEqual({
        viewMode: action.viewMode,
      })
  })
})
