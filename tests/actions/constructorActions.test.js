import * as actions from 'actions/constructorActions'
import * as types from 'consts/actionTypes'

describe('Тестирование экшенов для редьюсера Constructor', () => {
  it('Экшен requestContainerData', () => {
    const expectedAction = {
      type: types.REQUEST_CONTAINER_DATA,
    }

    expect(actions.requestContainerData())
      .toEqual(expectedAction)
  })

  it('Экшен receiveContainerData', () => {
    const key = 0
    const payload = {
      test: 'jest',
    }
    const expectedAction = {
      type: types.RECEIVE_CONTAINER_DATA,
      [key]: payload,
    }

    expect(actions.receiveContainerData(payload, key))
      .toEqual(expectedAction)
  })

  // it('Экшен fetchContainerData', () => {})
  // тут нужна ассинхронная обработка, нет времени ее пилить :(
})
