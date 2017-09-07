import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { push, goBack } from 'actions/navigationActions'

import { TopBar, Image, Icon, Container } from 'ui-components'
import { BottomNav } from 'components'
import styleCard from 'ui-components/Card/style.scss'

import styleBotNav from 'ui-components/BottomNavigation/style.scss'
import style from './style.scss'

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
      <div className='screen'>
        <TopBar
          isTransparent
          icon={<button onClick={this.goBack}>
            <Icon type='arrowBack' width='24' height='24' color='#fff' />
          </button>}
        />
        <Container scrolling stretching>
          {this.props.eventData
            ? <Image size='large' src={`http://io.yamblz.ru/i/events/${this.props.eventData.id}_large.jpg`} />
            : ''}
          {this.props.eventData
            ? <div className={`${styleCard.card__info} ${style.card__info_large}`}>
              <h2 className={`${styleCard.card__title} ${styleCard.card__title_large}`}>
                {this.props.eventData.title}
              </h2>
              <div style={{ marginBottom: 16, fontSize: '1.25rem', lineHeight: '1.75rem', color: '#000', }}>
                <p>{`${this.props.eventData.dateFormatted.day} - ${this.props.eventData.dateEndFormatted.day}, ${this.props.eventData.dateEndFormatted.month} `}</p>
                <p>{`${this.props.eventData.dateFormatted.time} - ${this.props.eventData.dateEndFormatted.time}`}</p>
              </div>
              <p
                style={{ fontSize: '1rem', lineHeight: '1.375rem', color: '#000' }}
                dangerouslySetInnerHTML={{ __html: this.props.eventData.description }}
              />
            </div>
            : ''}
        </Container>
        <BottomNav />
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
