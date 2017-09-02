import React from 'react'

import { List } from 'components'
import { Slider } from 'ui-components'

const SliderList = props => (
  <Slider>
    {
      props.payload.map(item => (
        <div>
          <List key={item.id} type='slider_events' data={item} />
        </div>
      ))
    }
  </Slider>
)

export default SliderList
