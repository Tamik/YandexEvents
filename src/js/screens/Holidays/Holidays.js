import React, { Component } from 'react'
import { connect } from 'react-redux'

import { push, goBack } from 'actions/navigationActions'

import { TopBar, Container, HolidayCard } from 'ui-components'
import { BottomNav } from 'components'

import { DataApi } from 'utils/DataApi'

import style from './style.scss'

class Holidays extends Component {
  constructor(props) {
    super(props)
    this.state = {
      holidays: [],
    }
  }

  componentWillMount() {
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
        <TopBar
          title='Все праздники'
        />
        <Container scrolling stretching>
          <div>
            <div style={{ margin: '24px 16px', color: '#333', fontSize: 16 }}>
              Мы собираем всю информацию о крупных городских праздниках.
              Здесь представлен анонс будущих мероприятий.
            </div>
            {this.state.holidays.map(item => (
              <HolidayCard
                key={item.id}
                content={item}
              />
            ))}
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
