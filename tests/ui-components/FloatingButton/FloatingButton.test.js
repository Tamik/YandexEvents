import React from 'react'
import renderer from 'react-test-renderer'

import { FloatingButton } from 'ui-components'

describe('FloatingButton', () => {
  it('Проверка снепшота компонента', () => {
    const component = renderer.create(
      <FloatingButton typeIcon='star' onClick={() => true} />
    )

    expect(component.toJSON()).toMatchSnapshot()
  })
})
