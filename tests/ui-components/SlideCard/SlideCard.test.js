import React from 'react'
import renderer from 'react-test-renderer'

import { SlideCard } from 'ui-components'

describe('SlideCard', () => {
  it('Проверка снепшота компонента', () => {
    const component = renderer.create(
      <SlideCard image='https://placehold.it/256x128' onClick={() => true} />
    )

    expect(component.toJSON()).toMatchSnapshot()
  })
})
