import React, { Component } from 'react'

import { DataApi } from 'utils/DataApi'

import { Card } from 'ui-components'

export default class ListContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      elements: [],
    }
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
      <div style={this.props.style}>
        {this.props.title ? <h3>{this.props.title}</h3> : ''}
        {this.state.elements.map(element => (
          <Card
            key={element.id}
            title={element.title}
            src={`http://io.yamblz.ru/i/events/${element.id}_small.jpg`}
            location={element.location_title}
            style={this.props.cardStyle}
          />
        ))}
      </div>
    )
  }
}
