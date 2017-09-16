import React, { Component } from 'react'
import { connect } from 'react-redux'

import { BottomNav } from 'components'

import { TopBar, Container, HolidayCard } from 'ui-components'

import { addToCalendar, DataApi } from 'utils'

/**
 * @class Holidays
 * @description Экран просмотра праздников
 */
class Holidays extends Component {
  constructor(props) {
    super(props)
    this.state = {
      holidays: [],
    }
  /**
   * @property state
   * @description Состояние компонента
   */
  }

  componentWillMount() {
    DataApi.getHolidays()
      .perform()
      .then(response => this.setState({
        holidays: response.data.data,
      }))
      .then(() => (
        this.state.holidays.map((day) => {
          const holiday = day
          holiday.open = false
          return holiday
        })))
  }

  /**
   * @method openDescription
   * @description Тумблер открытия, закрытия описания праздника
   * @param {number} holidayId
   * @return {Object}
   */
  openDescription = (holidayId) => {
    const newHolidays = this.state.holidays.map((day) => {
      const holiday = day
      if (holiday.id === holidayId) {
        holiday.open = !holiday.open
      }
      return holiday
    })

    this.setState({
      holidays: newHolidays,
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
                onClick={this.openDescription}
                content={item}
                addToCalendar={() => addToCalendar(
                  item.title,
                  'Москва',
                  item.description,
                  item.enabledBetweenDates.from,
                  item.enabledBetweenDates.to,
                )}
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
