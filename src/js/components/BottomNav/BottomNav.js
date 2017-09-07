import React from 'react'

import { BottomNavigation, Icon } from 'ui-components'

import styleBotNav from 'ui-components/BottomNavigation/style.scss'

const BottomNav = props => (
  <BottomNavigation>
    <div className={`${styleBotNav.botNav__item} ${styleBotNav.botNav__item_active}`}>
      <Icon type='eventFill' height='20' />
      День Города
    </div>
    <div className={`${styleBotNav.botNav__item}`}>
      <Icon type='star' height='20' />
      Все праздники
    </div>
    <div className={`${styleBotNav.botNav__item}`}>
      <Icon type='bookmark' height='20' />
      Закладки
    </div>
  </BottomNavigation>
)

export default BottomNav
