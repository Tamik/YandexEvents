import React from 'react'

import { List } from 'components'
import { Slider } from 'ui-components'

import style from 'components/List/style.scss'

const AvatarsList = props => (
  <div className={style.list__wrap}>
    <h3 className={style.list__title}>{props.title}</h3>
    <Slider>
      {
        props.payload.map(item => (
          <div>
            <List key={item.id} type='slider_avatars' data={item} />
          </div>
        ))
      }
    </Slider>
  </div>
)

export default AvatarsList
