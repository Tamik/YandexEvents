import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { push } from 'actions/navigationActions'
import { sendModalEventData } from 'actions/dataActions'

import { Event } from 'screens'

import { TopBar, Container, Card } from 'ui-components'
import { BottomNav } from 'components'

const Favorites = (props) => {
  const viewEvent = (eventData) => {
    props.onViewEvent(eventData)
  }
  return (
    <div className='screen'>
      <TopBar
        title='Закладки'
      />
      <Container scrolling stretching>
        <div style={{ margin: 16 }}>
          {
            Object.keys(props.favorites).length
              ? Object.keys(props.favorites).map((key, index) => (
                <Card
                  key={props.favorites[key].id}
                  title={props.favorites[key].title}
                  src={`${props.favorites[key].photo_small}`}
                  location={props.favorites[key].location_title}
                  size='medium'
                  style={{
                    marginBottom: 20,
                    animationDelay: `${index * 200}ms`,
                  }}
                  onClick={() => viewEvent(props.favorites[key])}
                  date={`${props.favorites[key].dateFormatted.day} ${props.favorites[key].dateFormatted.month} ${props.favorites[key].dateFormatted.time} `}
                />
              ))
              : <p style={{ textAlign: 'center', fontSize: 14 }}>Здесь будут ваши закладки</p>}
        </div>
      </Container>
      <BottomNav />
      {props.eventData && props.eventData !== '__CLOSE__'
        ? <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 2000,
          background: '#fff',
          width: '100vw',
          height: '100vh',
        }}
        >
          <Event params={{ eventId: props.eventData.id }} />
        </div>
        : ''}
    </div>
  )
}

Favorites.propTypes = {
  onViewEvent: PropTypes.func.isRequired,
  favorites: PropTypes.shape().isRequired,
}

export default connect(
  state => ({
    favorites: state.user.favorites || {},
    eventData: state.data.eventData,
  }),
  dispatch => ({
    onViewEvent: (eventData) => {
      const newEventData = eventData
      newEventData.notModal = true

      dispatch(sendModalEventData(newEventData))
      dispatch(push(`/event/${eventData.id}`))
    },
  })
)(Favorites)
