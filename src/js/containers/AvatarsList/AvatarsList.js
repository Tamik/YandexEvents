import React from 'react'

import { List } from 'components'
import { Slider } from 'ui-components'

const AvatarsList = props => (
  <Slider>
    {
      props.payload.map(item => (
        <div style={{ marginRight: 16 }}>
          <List key={item.id} type='slider_avatars' data={item} />
        </div>
      ))
    }
  </Slider>
)

export default AvatarsList
