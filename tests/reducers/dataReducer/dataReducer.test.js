import * as types from 'consts/actionTypes'

import dataReducer from 'reducers/dataReducer'

describe('Тестирование редьюсера Data', () => {
  it('Начальное состояние', () => {
    const action = {}

    expect(dataReducer(undefined, action))
      .toEqual({
        eventData: null,
        placeData: null,
        entityData: null,
        categoryData: null,
        configData: null,
      })
  })

  it('Обработка экшена DATA_EVENT', () => {
    const action = {
      type: types.DATA_EVENT,
      eventData: {
        test: 'jest',
      },
    }

    expect(dataReducer(undefined, action))
      .toEqual({
        eventData: action.eventData,
        placeData: null,
        entityData: null,
        categoryData: null,
        configData: null,
      })
  })

  it('Обработка экшена DATA_EVENT_CLEAR', () => {
    const action = {
      type: types.DATA_EVENT_CLEAR,
    }

    expect(dataReducer(undefined, action))
      .toEqual({
        eventData: '__CLEAR__',
        placeData: null,
        entityData: null,
        categoryData: null,
        configData: null,
      })
  })

  it('Обработка экшена DATA_CATEGORY', () => {
    const action = {
      type: types.DATA_CATEGORY,
      categoryData: {
        test: 'jest',
      },
    }

    expect(dataReducer(undefined, action))
      .toEqual({
        eventData: null,
        placeData: null,
        entityData: null,
        categoryData: action.categoryData,
        configData: null,
      })
  })

  it('Обработка экшена DATA_PLACE', () => {
    const action = {
      type: types.DATA_PLACE,
      placeData: {
        test: 'jest',
      },
    }

    expect(dataReducer(undefined, action))
      .toEqual({
        eventData: null,
        placeData: action.placeData,
        entityData: null,
        categoryData: null,
        configData: null,
      })
  })

  it('Обработка экшена DATA_PLACE_CLEAR', () => {
    const action = {
      type: types.DATA_PLACE_CLEAR,
    }

    expect(dataReducer(undefined, action))
      .toEqual({
        eventData: null,
        placeData: '__CLEAR__',
        entityData: null,
        categoryData: null,
        configData: null,
      })
  })

  it('Обработка экшена DATA_ENTITY', () => {
    const action = {
      type: types.DATA_ENTITY,
      entityData: {
        test: 'jest',
      },
    }

    expect(dataReducer(undefined, action))
      .toEqual({
        eventData: null,
        placeData: null,
        entityData: action.entityData,
        categoryData: null,
        configData: null,
      })
  })

  it('Обработка экшена DATA_ENTITY_CLEAR', () => {
    const action = {
      type: types.DATA_ENTITY_CLEAR,
    }

    expect(dataReducer(undefined, action))
      .toEqual({
        eventData: null,
        placeData: null,
        entityData: '__CLEAR__',
        categoryData: null,
        configData: null,
      })
  })

  it('Обработка экшена DATA_CONFIG', () => {
    const action = {
      type: types.DATA_CONFIG,
      configData: {
        test: 'jest',
      },
    }

    expect(dataReducer(undefined, action))
      .toEqual({
        eventData: null,
        placeData: null,
        entityData: null,
        categoryData: null,
        configData: action.configData,
      })
  })
})
