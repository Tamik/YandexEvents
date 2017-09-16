import React from 'react'
import renderer from 'react-test-renderer'

import { Tabs } from 'ui-components'

describe('Tabs', () => {
  it('Проверка снепшота компонента', () => {
    const component = renderer.create(
      <Tabs>
        <div>
          <span>1</span>
          <span>2</span>
          <span>3</span>
        </div>
      </Tabs>
    )

    expect(component.toJSON()).toMatchSnapshot()
  })
})
