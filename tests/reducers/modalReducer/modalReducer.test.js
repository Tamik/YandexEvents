import modalReducer from 'reducers/modalReducer'

describe('Тестирование редьюсера Modal', () => {
  it('Начальное состояние', () => {
    const action = {}

    expect(modalReducer(undefined, action))
      .toEqual({})
  })
})
