import React from 'react'
import PropTypes from 'prop-types'

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

EventsList.propTypes = {
  payload: PropTypes.shape().isRequired,
}

export default EventsList
