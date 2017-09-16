import React from 'react'
import renderer from 'react-test-renderer'

import { MapCard } from 'ui-components'

describe('MapCard', () => {
  it('Проверка снепшота компонента', () => {
    const component = renderer.create(
      <MapCard image='https://placehold.it/256x128' onClick={() => true} />
    )

    expect(component.toJSON()).toMatchSnapshot()
  })
})
