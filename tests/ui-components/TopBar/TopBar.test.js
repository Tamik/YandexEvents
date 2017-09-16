import React from 'react'
import renderer from 'react-test-renderer'

import { TopBar } from 'ui-components'

describe('TopBar', () => {
  it('Проверка снепшота компонента', () => {
    const component = renderer.create(
      <TopBar />
    )

    expect(component.toJSON()).toMatchSnapshot()
  })
})
