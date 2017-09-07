import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { DataApi } from 'utils/DataApi'

import { Card } from 'ui-components'

export default class ListContainer extends Component {
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
