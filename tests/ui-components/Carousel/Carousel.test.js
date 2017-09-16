import React from 'react'
import renderer from 'react-test-renderer'

import { Button, Carousel } from 'ui-components'

describe('Carousel', () => {
  it('Проверка снепшота компонента', () => {
    const component = renderer.create(
      <Carousel>
        <div>
          <Button label='Кнопка 1' onClick={() => true} />
          <Button label='Кнопка 2' onClick={() => true} />
          <Button label='Кнопка 3' onClick={() => true} />
        </div>
      </Carousel>
    )

    expect(component.toJSON()).toMatchSnapshot()
  })
})
