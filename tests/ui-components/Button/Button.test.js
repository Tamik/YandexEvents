import React from 'react'
import renderer from 'react-test-renderer'

import { Button } from 'ui-components'

describe('Button', () => {
  it('Проверка снепшота компонента', () => {
    const component = renderer.create(
      <Button label='Кнопка' onClick={() => true} />
    )

    expect(component.toJSON()).toMatchSnapshot()
  })
})
