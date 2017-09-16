import React from 'react'
import renderer from 'react-test-renderer'

import { BottomNavigation, Button } from 'ui-components'

describe('BottomNavigation', () => {
  it('Проверка снепшота компонента', () => {
    const component = renderer.create(
      <BottomNavigation>
        <div>
          <Button label='День города' onClick={() => true} />
          <Button label='Все праздники' onClick={() => true} />
          <Button label='Закладки' onClick={() => true} />
        </div>
      </BottomNavigation>
    )

    expect(component.toJSON()).toMatchSnapshot()
  })
})
