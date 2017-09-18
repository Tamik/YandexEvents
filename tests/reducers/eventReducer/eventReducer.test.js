import eventReducer from 'reducers/eventReducer'

describe('Тестирование редьюсера Event', () => {
  it('Начальное состояние', () => {
    const action = {}

    expect(eventReducer(undefined, action))
      .toEqual({
        event: {},
      })
  })

  it('Обработка экшена SEND_TO_EVENT', () => {
    const action = {
      type: 'SEND_TO_EVENT',
      payload: {
        test: 'jest',
      },
    }

    expect(eventReducer(undefined, action))
      .toEqual({
        event: action.payload,
      })
  })
})
