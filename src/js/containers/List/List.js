import React, { Component } from 'react'
import axios from 'axios'

import { Card } from 'ui-components'

export default class ListContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      elements: [],
    }
  }

  componentWillMount() {
    axios.get('http://io.yamblz.ru/events', {
      params: {
        items_per_page: 3,
      },
    })
      .then(response => this.setState({
        elements: response.data.data,
      }))
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
