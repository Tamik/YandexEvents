import React from 'react'
import { List } from 'components'
import { Carousel } from 'ui-components'

const EventsList = props => (
  <Carousel>
    <List type='events' />
  </Carousel>
)

export default EventsList
