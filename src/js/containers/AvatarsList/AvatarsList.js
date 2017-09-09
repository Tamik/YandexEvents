import React from 'react'

import { List } from 'components'
import { Slider } from 'ui-components'

import style from 'components/List/style.scss'

const AvatarsList = props => (
  <div className={style.list__wrap}>
    {props.title
      ? <h3
        style={{
          fontSize: '1rem',
          margin: '36px 16px 8px',
          lineHeight: '1.25rem',
        }}
      >{props.title}</h3>
      : null
    }
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
