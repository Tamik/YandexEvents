import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { push, goBack } from 'actions/navigationActions'

import { TopBar, Image, Icon, Container } from 'ui-components'
import { BottomNav } from 'components'

import { DataApi } from 'utils/DataApi'

import styleBotNav from 'ui-components/BottomNavigation/style.scss'
import style from './style.scss'

class Favs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      holidays: [],
    }
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className='screen'>
        <Container scrolling stretching>
          Список избранных событий
        </Container>
        <BottomNav />
      </div>
    )
  }
}

export default connect(
  state => ({
    /* favs: state.user.favs */
  }),
  dispatch => ({
  })
)(Favs)
