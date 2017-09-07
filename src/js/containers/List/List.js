import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { push } from 'actions/navigationActions'
import { sendModalEventData } from 'actions/dataActions'

import { Card } from 'ui-components'

import { DataApi } from 'utils/DataApi'

class ListContainer extends Component {
  state = {
    elements: [],
  }

  componentWillMount() {
    if (this.props.params) {
      DataApi
        .prepareQuery(this.props.params)
        .perform()
        .then(response => this.setState({
          elements: response.data.data,
        }))
    }
    else {
      DataApi.getEvents()
        .byHoliday(1)
        .byCategory(this.props.categoryId)
        .perform()
        .then(response => this.setState({
          elements: response.data.data,
        }))
    }
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
            onClick={() => this.viewEvent(this.props.route, element)}
            date='11 сентября в 22:00'
          />
        ))}
      </div>
    )
  }
}

ListContainer.propTypes = {
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
    onViewEvent: (route, eventData) => {
      dispatch(sendModalEventData(eventData))
      dispatch(push(route.replace('%', eventData.id)))
    },
  })
)(ListContainer)
