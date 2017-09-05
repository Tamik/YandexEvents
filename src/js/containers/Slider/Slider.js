import React, { Component } from 'react'
import axios from 'axios'

import { Card, Slider } from 'ui-components'

export default class SliderContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      elements: [],
    }
  }

  componentWillMount() {
    axios.get('http://io.yamblz.ru/events', {
      params: {
        items_per_page: 5,
      },
    })
      .then(response => this.setState({
        elements: response.data.data,
      }))
  }

  render() {
    return (
      <div style={this.props.style}>
        <h3>{this.props.title}</h3>
        <Slider>
          {this.state.elements.map(element => (
            <Card
              key={element.id}
              title={element.title}
              src={`http://io.yamblz.ru/i/events/${element.id}_large.jpg`}
              location={element.location_title}
              size='large'
              style={this.props.cardStyle}
            />
          ))}
        </Slider>
      </div>
    )
  }
}
