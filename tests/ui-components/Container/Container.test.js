import React from 'react'
import renderer from 'react-test-renderer'

import { Button, Container } from 'ui-components'

describe('Container', () => {
  it('Проверка снепшота компонента', () => {
    const component = renderer.create(
      <Container>
        <div>
          <Button label='Кнопка 1' onClick={() => true} />
          <Button label='Кнопка 2' onClick={() => true} />
          <Button label='Кнопка 3' onClick={() => true} />
        </div>
      </Container>
    )

    expect(component.toJSON()).toMatchSnapshot()
  })
})
