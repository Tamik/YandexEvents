import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { DataApi } from 'utils/DataApi'

import { Card, Slider } from 'ui-components'

export default class SliderContainer extends Component {
  state = {
    elements: [],
  }

  componentWillMount() {
    DataApi
      .prepareQuery(this.props.params)
      .perform()
      .then(response => this.setState({
        elements: response.data.data,
      }))
  }

  render() {
    return (
      <div
        style={{
          ...this.props.style,
          margin: '16px 0',
        }}
      >
        {this.props.title
          ? <h3
            style={{
              fontSize: '1.25rem',
              margin: 16,
              marginLeft: 16,
            }}
          >{this.props.title}</h3>
          : null
        }
        <Slider>
          {this.state.elements.map(element => (
            <Card
              key={element.id}
              title={element.title}
              src={`http://io.yamblz.ru/i/events/${element.id}_large.jpg`}
              location={element.location_title}
              size={this.props.cardSize}
              style={{
                ...this.props.cardStyle,
                maxWidth: 300,
                margin: '8px 16px',
              }}
            />
          ))}
        </Slider>
      </div>
    )
  }
}

SliderContainer.propTypes = {
  title: PropTypes.string,
  style: PropTypes.object,
  cardSize: PropTypes.string,
  cardStyle: PropTypes.object,
  params: PropTypes.object,
}
