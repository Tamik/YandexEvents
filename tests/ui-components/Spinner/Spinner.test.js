import React from 'react'
import renderer from 'react-test-renderer'

import { Spinner } from 'ui-components'

describe('Spinner', () => {
  it('Проверка снепшота компонента', () => {
    const component = renderer.create(
      <Spinner />
    )

    expect(component.toJSON()).toMatchSnapshot()
  })
})
