import React from 'react'

import { List } from 'components'

const EventsList = props => (
  <div style={{ margin: '0 16px', marginTop: 24 }}>
    {
      props.payload.map(item => (
        <List key={item.id} type='events' data={item} />
      ))
    }
  </div>
)

export default EventsList
