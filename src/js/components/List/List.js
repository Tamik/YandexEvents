import React from 'react'
import PropTypes from 'prop-types'

import { Card } from 'ui-components'

const List = (props) => {
  if (props.type === 'events') {
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

export default List
