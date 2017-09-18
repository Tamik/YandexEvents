import * as actions from 'actions/modalActions'

describe('Тестирование экшенов для редьюсера Modal', () => {
  it('Экшен actionViewEvent', () => {
    const payload = {
      test: 'jest',
    }
    const expectedAction = {
      type: 'MODAL_EVENT_VIEW',
      eventData: payload,
    }

    expect(actions.actionViewEvent(payload))
      .toEqual(expectedAction)
  })
})
