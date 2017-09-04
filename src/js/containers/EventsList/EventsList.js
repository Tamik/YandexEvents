import React from 'react'

import { List } from 'components'

const EventsList = props => (
  <div style={{ margin: 16, marginBottom: 0 }}>
    {
      props.payload.map(item => (
        <List key={item.id} type='events' data={item} />
      ))
    }
  </div>
)

export default EventsList
