import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { push } from 'actions/navigationActions'
import { sendModalEventData } from 'actions/dataActions'

import { TopBar, Container, Card } from 'ui-components'
import { BottomNav } from 'components'

// import { DataApi } from 'utils/DataApi'

// import styleBotNav from 'ui-components/BottomNavigation/style.scss'
// import style from './style.scss'

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
              ? Object.keys(props.favs).map(key => (
                <Card
                  key={props.favs[key].id}
                  title={props.favs[key].title}
                  src={`${props.favs[key].photo_small}`}
                  location={props.favs[key].location_title}
                  size='medium'
                  style={{
                    marginBottom: 20,
                  }}
                  onClick={() => viewEvent(props.favs[key])}
                  date={`${props.favs[key].dateFormatted.day} ${props.favs[key].dateFormatted.month} ${props.favs[key].dateFormatted.time} `}
                />
              ))
              : <p style={{ textAlign: 'center', fontSize: 14 }}>Здесь будут ваши закладки</p>}
        </div>
      </Container>
      <BottomNav />
    </div>
  )
}

Favs.propTypes = {
  onViewEvent: PropTypes.func.isRequired,
  favs: PropTypes.shape().isRequired,
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
