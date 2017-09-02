import React from 'react'

import { List } from 'components'

const EventsList = props => (
  <div style={{ marginLeft: 16, marginTop: 16 }}>
    {
      props.payload.map(item => (
        <List key={item.id} type='events' data={item} />
      ))
    }
  </div>
)

export default EventsList
