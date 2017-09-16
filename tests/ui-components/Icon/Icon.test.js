import React from 'react'
import renderer from 'react-test-renderer'

import { Icon } from 'ui-components'

describe('Icon', () => {
  it('Проверка снепшота компонента', () => {
    const component = renderer.create(
      <Icon type='star' />
    )

    expect(component.toJSON()).toMatchSnapshot()
  })
})
