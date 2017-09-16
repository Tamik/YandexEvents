import React from 'react'
import renderer from 'react-test-renderer'

import { Image } from 'ui-components'

describe('Image', () => {
  it('Проверка снепшота компонента', () => {
    const component = renderer.create(
      <Image src='https://placehold.it/256x256' />
    )

    expect(component.toJSON()).toMatchSnapshot()
  })
})
