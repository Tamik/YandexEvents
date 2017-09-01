import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { push, goBack } from 'actions/navigationActions'

import style from './style.scss'

class Event extends Component {
  constructor(props) {
    super(props)

    if (!props.eventData) {
      // Подгружаем данные с сервера
      // Вот так можно взять eventId
      console.log('eventData отсутствует в store')
      console.log('eventId: ', props.params.id)
    }
    else {
      // Покажем то что есть, а остальное подгрузим
      console.log('eventData присутствует в store')
      console.log('eventId: ', props.params.id)
    }

    this.goBack = this.goBack.bind(this)
  }

  componentDidMount() {

  }

  goBack() {
    this.props.goBack()
  }

  render() {
    return (
      <div className='transition-item screen'>
        <div className={`${style['page-inner']}`}>
          <button onClick={this.goBack}>GoBack</button>
          <br />
          <img src={'xxx'} />
          <h2>event</h2>
          {/* <p>{props.event.description}</p> */}
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    eventData: state.eventData,
  }),
  dispatch => ({
    goBack: () => {
      dispatch(goBack())
    },
  })
)(Event)
