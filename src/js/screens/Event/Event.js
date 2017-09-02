import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { push, goBack } from 'actions/navigationActions'

import { TopBar, Image } from 'ui-components'
import style from './style.scss'
import styleCard from 'ui-components/Card/style.scss'

class Event extends Component {
  constructor(props) {
    super(props)
    if (!props.eventData) {
      // Подгружаем данные с сервера
      // Вот так можно взять eventId
      // console.log('eventData отсутствует в store')
      console.log('eventId: ', props.params.eventId)
    }
    else {
      // Покажем то что есть, а остальное подгрузим
      // console.log('eventData присутствует в store', props.eventData)
      console.log('eventId: ', props.params.eventId, '\n eventData: ', props.eventData)
    }
  }

  componentDidMount() {

  }

  goBack = () => {
    this.props.goBack()
  }

  render() {
    return (
      <div>
        <TopBar
          isTransparent
          icon={<button onClick={this.goBack}>←</button>}
        />
        <Image size='large' src='https://kudago.com/media/thumbs/xl/images/event/af/3c/af3cb19d87c01fdde4943d8a0c6e56d7.jpg' />
        <div className={styleCard.card__info}>
          <h2 className={`${styleCard.card__title} ${styleCard.card__title_medium}`}>Вечер живого джаза в Хорошей республике</h2>
          <div style={{ fontSize: '1.25rem', lineHeight: '1.75rem' }}>
            <p>2 сентября</p>
            <p>20:00</p>
          </div>
          <p style={{ fontSize: '1rem', lineHeight: '1.375rem' }}>Джаз — музыка солидная, богатая на традиции и ритуалы. Но не стоит относиться к ней, как к музейному экспонату: импровизация, кураж, азарт делают стиль вечно молодым. К тому же эстетика джаза позволяет пускаться в любые авантюры со смешением жанров. Неудивительно, что столько музыкантов увлекаются этим направлением.</p>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    eventData: state.data.eventData,
  }),
  dispatch => ({
    goBack: () => {
      dispatch(goBack())
    },
  })
)(Event)
