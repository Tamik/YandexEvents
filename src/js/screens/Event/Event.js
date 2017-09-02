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
      // console.log('eventId: ', props.params.eventId)
    }
    else {
      // Покажем то что есть, а остальное подгрузим
      // console.log('eventData присутствует в store', props.eventData)
      // console.log('eventId: ', props.params.eventId, '\n eventData: ', props.eventData)
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
          icon={<button onClick={this.goBack}>
            <svg
              version='1.1'
              id='Ebene_1'
              x='0px'
              y='0px'
              height='24px'
              width='24px'
              viewBox='0 0 24 24'
            >
              <polygon id='Shape' fill='#fff' points='20,11 7.8,11 13.4,5.4 12,4 4,12 12,20 13.4,18.6 7.8,13 20,13 ' />
            </svg>
          </button>}
        />
        <Image size='large' src={`http://io.yamblz.ru/i/events/${this.props.eventData.id}_large.jpg`} />
        <div className={styleCard.card__info}>
          <h2 className={`${styleCard.card__title} ${styleCard.card__title_large}`}>
            {console.log(this.props.eventData)}
            {this.props.eventData.title}
          </h2>
          <div style={{ marginBottom: 16, fontSize: '1.25rem', lineHeight: '1.75rem' }}>
            <p>2 сентября</p>
            <p>20:00</p>
          </div>
          <p
            style={{ fontSize: '1rem', lineHeight: '1.375rem' }}
            dangerouslySetInnerHTML={{ __html: this.props.eventData.description }}
          />
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
