import React, { Component } from 'react'
import { connect } from 'react-redux'

import { push, goBack } from 'actions/navigationActions'

import { TopBar, Image, Icon, Container } from 'ui-components'
import { BottomNav } from 'components'

import { DataApi } from 'utils/DataApi'

import styleBotNav from 'ui-components/BottomNavigation/style.scss'
import style from './style.scss'

class Holidays extends Component {
  constructor(props) {
    super(props)
    this.state = {
      holidays: [],
    }
  }

  componentDidMount() {
    DataApi.getHolidays()
      .perform()
      .then((response) => {
        this.setState({
          holidays: response.data.data,
        })
      })
  }

  render() {
    return (
      <div className='screen'>
        <Container scrolling stretching>
          <div>
            <div style={{ margin: 10 }}>
              Блок с включалкой напоминаний
            </div>
            <br />
            {this.state.holidays.map((item) => {
              return (
                <div key={item.id} style={{ margin: 10 }}>
                  <h4>{item.title}</h4>
                  <p>Дата празднования:<br />
                    {item.holiDates[0].date}
                    {item.holiDates.length > 1
                      ? ` - ${item.holiDates[1].date}`
                      : ''}
                  </p>
                  <p>Проверить, активный праздник или нет, можно по:<br />
                    {item.enabledBetweenDates.from} - {item.enabledBetweenDates.to}</p>
                  <div>Описание: {item.description}</div>
                </div>
              )
            })}
          </div>
        </Container>
        <BottomNav />
      </div>
    )
  }
}

export default connect(
  state => ({
  }),
  dispatch => ({
  })
)(Holidays)
