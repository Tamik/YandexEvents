import * as actions from 'actions/dataActions'
import * as types from 'consts/actionTypes'

describe('Тестирование экшенов для редьюсера Data', () => {
  it('Экшен sendModalEventData', () => {
    const payload = {
      test: 'jest',
    }
    const expectedAction = {
      type: types.DATA_EVENT,
      eventData: payload,
    }

    expect(actions.sendModalEventData(payload))
      .toEqual(expectedAction)
  })

  it('Экшен clearModalEventData', () => {
    const expectedAction = {
      type: types.DATA_EVENT_CLEAR,
    }

    expect(actions.clearModalEventData())
      .toEqual(expectedAction)
  })

  it('Экшен sendModalCategoryData', () => {
    const payload = {
      test: 'jest',
    }
    const expectedAction = {
      type: types.DATA_CATEGORY,
      categoryData: payload,
    }

    expect(actions.sendModalCategoryData(payload))
      .toEqual(expectedAction)
  })

  it('Экшен clearModalCategoryData', () => {
    const expectedAction = {
      type: types.DATA_CATEGORY,
    }

    expect(actions.clearModalCategoryData())
      .toEqual(expectedAction)
  })

  it('Экшен sendModalPlaceData', () => {
    const payload = {
      test: 'jest',
    }
    const expectedAction = {
      type: types.DATA_PLACE,
      placeData: payload,
    }

    expect(actions.sendModalPlaceData(payload))
      .toEqual(expectedAction)
  })

  it('Экшен clearModalPlaceData', () => {
    const expectedAction = {
      type: types.DATA_PLACE_CLEAR,
    }

    expect(actions.clearModalPlaceData())
      .toEqual(expectedAction)
  })

  it('Экшен sendModalEntityData', () => {
    const payload = {
      test: 'jest',
    }
    const expectedAction = {
      type: types.DATA_ENTITY,
      entityData: payload,
    }

    expect(actions.sendModalEntityData(payload))
      .toEqual(expectedAction)
  })

  it('Экшен clearModalEntityData', () => {
    const expectedAction = {
      type: types.DATA_ENTITY_CLEAR,
    }

    expect(actions.clearModalEntityData())
      .toEqual(expectedAction)
  })

  it('Экшен sendApplicationConfig', () => {
    const payload = {
      test: 'jest',
    }
    const expectedAction = {
      type: types.DATA_CONFIG,
      configData: payload,
    }

    expect(actions.sendApplicationConfig(payload))
      .toEqual(expectedAction)
  })
})
