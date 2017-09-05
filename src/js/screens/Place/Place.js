import React from 'react'
import { connect } from 'react-redux'
import { Container, TopBar } from 'ui-components'

import { goBack } from 'actions/navigationActions'

const Place = (props) => {
  if (!props.placeData) {
    // Подгружаем данные с сервера
    // Вот так можно взять eventId
    console.log('placeData отсутствует в store')
    console.log('placeId: ', props.params.placeId)
  }
  else {
    // Покажем то что есть, а остальное подгрузим
    console.log('placeData присутствует в store')
    console.log('placeId: ', props.params.placeId, '\n placeData: ', props.placeData)
  }
  const naviGoBack = () => {
    props.onGoBack()
  }
  return (
    <div className='screen transition-item'>
      <TopBar>
        <h1>This is Place: {props.params.placeId}</h1>
      </TopBar>
      <Container stretching scrolling>
        <button onClick={naviGoBack}>Go Back</button>
        <p>Тут будет список событий по месту</p>
      </Container>
    </div>
  )
}

export default connect(
  state => ({
    placeData: state.data.placeData,
  }),
  dispatch => ({
    onGoBack: () => {
      dispatch(goBack())
    },
  })
)(Place)

