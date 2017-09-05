import React, { Component } from 'react'
import axios from 'axios'

import { Card, Carousel } from 'ui-components'

export default class CarouselContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      elements: [],
    }
  }

  componentWillMount() {
    axios.get('http://io.yamblz.ru/events', {
      params: {
        items_per_page: 10,
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
        <Carousel>
          <div>
            {this.state.elements.map(element => (
              <Card
                key={element.id}
                title={element.title}
                src={`http://io.yamblz.ru/i/events/${element.id}_large.jpg`}
                location={element.location_title}
                size='medium'
                style={this.props.cardStyle}
              />
            ))}
          </div>
        </Carousel>
      </div>
    )
  }
}
