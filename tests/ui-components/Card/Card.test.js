import React from 'react'
import renderer from 'react-test-renderer'

import { Card } from 'ui-components'

describe('Card', () => {
  it('Проверка снепшота компонента', () => {
    const component = renderer.create(
      <Card src='https://placehold.it/256x128' onClick={() => true} />
    )

    expect(component.toJSON()).toMatchSnapshot()
  })
})
