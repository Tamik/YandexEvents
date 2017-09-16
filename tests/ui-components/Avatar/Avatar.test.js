import React from 'react'
import renderer from 'react-test-renderer'

import { Avatar } from 'ui-components'

describe('Avatar', () => {
  it('Проверка снепшота компонента', () => {
    const component = renderer.create(
      <Avatar src='https://placehold.it/256x256' />
    )

    expect(component.toJSON()).toMatchSnapshot()
  })
})
