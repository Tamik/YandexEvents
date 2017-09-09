import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { push, goBack } from 'actions/navigationActions'
import { sendModalEventData } from 'actions/dataActions'

import { TopBar, Image, Icon, Container, Card } from 'ui-components'
import { BottomNav } from 'components'

import { DataApi } from 'utils/DataApi'

import styleBotNav from 'ui-components/BottomNavigation/style.scss'
import style from './style.scss'

const Favs = (props) => {
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
            Object.keys(props.favs).length
              ? props.favs.map(item => (
                <Card
                  key={item.id}
                  title={item.title}
                  src={`${item.photo_small}`}
                  location={item.location_title}
                  size='medium'
                  style={{
                    marginBottom: 20,
                  }}
                  onClick={() => viewEvent(item)}
                  date={`${item.dateFormatted.day} ${item.dateFormatted.month} ${item.dateFormatted.time} `}
                />
              ))
              : <p style={{ textAlign: 'center', fontSize: 14 }}>Здесь будут ваши закладки</p>}
        </div>
      </Container>
      <BottomNav />
    </div>
  )
}

export default connect(
  state => ({
    favs: state.user.favs || {},
  }),
  dispatch => ({
    onViewEvent: (eventData) => {
      dispatch(sendModalEventData(eventData))
      dispatch(push(`/event/${eventData.id}`))
    },
  })
)(Favs)
