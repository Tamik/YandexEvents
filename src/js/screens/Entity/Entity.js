import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { push, goBack } from 'actions/navigationActions'

import { TopBar, Image, Icon, Container } from 'ui-components'
import { BottomNav } from 'components'
import styleCard from 'ui-components/Card/style.scss'

import styleBotNav from 'ui-components/BottomNavigation/style.scss'
import style from './style.scss'

class Entity extends Component {
  constructor(props) {
    super(props)
    if (!props.entityData) {
      // Подгружаем данные с сервера
      // Вот так можно взять entityId
      // console.log('entityData отсутствует в store')
      // console.log('entityId: ', props.params.entityId)
    }
    else {
      // Покажем то что есть, а остальное подгрузим
      // console.log('entityData присутствует в store', props.entityData)
      // console.log('entityId: ', props.params.entityId, '\n entityData: ', props.entityData)
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
          title='Entity title'
          icon={<button onClick={this.goBack}>
            <Icon type='arrowBack' width='24' height='24' color='#000' />
          </button>}
        />
        <Container scrolling stretching>
          Events list by entity
        </Container>
        <BottomNav />
      </div>
    )
  }
}

export default connect(
  state => ({
    entityData: state.data.entityData,
  }),
  dispatch => ({
    goBack: () => {
      dispatch(goBack())
    },
  })
)(Entity)
