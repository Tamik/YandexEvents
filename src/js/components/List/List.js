import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import { push } from 'actions/navigationActions'
import { sendModalEventData } from 'actions/dataActions'

import { Card } from 'ui-components'

const List = (props) => {
  const viewEvent = (eventData) => {
    props.onViewEvent(eventData)
  }
  if (props.type === 'events') {
    return (
      <div
        role='button'
        onClick={() => {
          viewEvent(props.data)
        }}
        style={{ borderBottom: '1px solid #e5e5e5', marginBottom: 16, paddingBottom: 16 }}
      >
        <Card
          size='small'
          src={`http://io.yamblz.ru/i/events/${props.data.id}_small.jpg`}
          title={props.data.title}
          description={props.data.description}
        />
      </div>
    )
  }
  else if (props.type === 'slider_events') {
    return (
      <Card
        size='medium'
        src={`http://io.yamblz.ru/i/events/${props.data.id}_large.jpg`}
        title={props.data.title}
        description={props.data.description}
      />
    )
  }
  return (
    <div style={{ borderBottom: '1px solid #e5e5e5', marginBottom: 16, paddingBottom: 16 }}>
      <Card
        size='small'
        src={`http://io.yamblz.ru/i/events/${props.data.id}_small.jpg`}
        title={props.data.title}
        description={props.data.description}
      />
    </div>
  )
}

List.defaultProps = {
  items: ['Выставка', 'Выставка 2', 'Концерт'],
  type: 'events',
}

List.propTypes = {
  items: PropTypes.array,
  // items: PropTypes.arrayOf(PropTypes.object),
  type: PropTypes.string,
}

export default connect(
  state => ({
    state, /* contains: user, router, data @todo: exclude superfluous */
  }),
  dispatch => ({
    onViewEvent: (eventData) => {
      dispatch(sendModalEventData(eventData))
      dispatch(push(`/event/${eventData.id}`))
    },
  })
)(List)
