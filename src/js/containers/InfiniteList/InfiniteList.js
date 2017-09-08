import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { push } from 'actions/navigationActions'
import { sendModalEventData } from 'actions/dataActions'

import { Button, Card, Spinner } from 'ui-components'

import { DataApi } from 'utils/DataApi'

class InfiniteListContainer extends Component {
  state = {
    elements: [],
    route: {},
    page: 1,
    loadingMoreEvents: false,
  }

  componentWillMount() {
    this.getData(this.props, this.state.page)
  }

  componentWillUpdate(nextProps) {
    const isCategoryEqual = this.props.categoryId === nextProps.categoryId
    const isFilterByDateEqual = this.props.filterByDate === nextProps.filterByDate

    if (!isCategoryEqual || !isFilterByDateEqual) {
      this.getData(nextProps, this.state.page)
    }
  }

  getData = (props) => {
    const getEventsRequest = DataApi.getEvents().byHoliday(1)

    if (props.filterByDate) {
      getEventsRequest.byDate(props.filterByDate)
    }

    getEventsRequest
      .byCategory(props.categoryId)
      .perform()
      .then(response => this.setState({
        elements: response.data.data,
        route: { url: '/events/%' },
      }))
  }

  viewEvent = (route, eventData) => {
    this.props.onViewEvent(route, eventData)
  }

  render() {
    return (
      <div
        style={{
          ...this.props.style,
          margin: 16,
          marginBottom: this.props.categoryId ? 16 * 4 : 16,
        }}
      >
        {this.props.title
          ? <h3
            style={{
              fontSize: '1.25rem',
              margin: '16px 0',
            }}
          >{this.props.title}</h3>
          : null
        }
        {this.state.elements.map(element => (
          <Card
            key={element.id}
            title={element.title}
            src={`http://io.yamblz.ru/i/events/${element.id}_small.jpg`}
            location={element.location_title}
            size='medium'
            style={{
              ...this.props.cardStyle,
              marginBottom: 20,
            }}
            onClick={() => this.viewEvent(this.state.route.url, element)}
            date={`${element.dateFormatted.day} ${element.dateFormatted.month} ${element.dateFormatted.time} `}
          />
        ))}
        {this.state.loadingMoreEvents
          ? (<Spinner />)
          : (<Button label='Показать ещё' primary onClick={() => this.getData(this.props, this.state.page)} />)
        }
      </div>
    )
  }
}

InfiniteListContainer.propTypes = {
  title: PropTypes.string,
  style: PropTypes.object,
  cardSize: PropTypes.string,
  cardStyle: PropTypes.object,
  params: PropTypes.object,
  categoryId: PropTypes.string,
}

export default connect(
  state => ({}),
  dispatch => ({
    onViewEvent: (route, element) => {
      dispatch(sendModalEventData(element))
      dispatch(push(route.replace('%', element.id)))
    },
  })
)(InfiniteListContainer)
