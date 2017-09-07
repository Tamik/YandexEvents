import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { push } from 'actions/navigationActions'
import { sendModalEventData } from 'actions/dataActions'

import { SlideCard, Slider } from 'ui-components'

import { DataApi } from 'utils/DataApi'

class SliderContainer extends Component {
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

  viewEvent = (route, eventData) => {
    this.props.onViewEvent(route, eventData)
  }

  render() {
    return (
      <div
        style={{
          ...this.props.style,
          margin: '16px 0',
          marginLeft: '16px',
        }}
      >
        {this.props.title
          ? <h3
            style={{
              fontSize: '1.25rem',
              margin: '16px',
            }}
          >{this.props.title}</h3>
          : null
        }
        <Slider>
          {this.state.elements.map(element => (
            <SlideCard
              key={element.id}
              title={element.title}
              src={`http://io.yamblz.ru/i/events/${element.id}_large.jpg`}
              location={element.location_title}
              size={this.props.cardSize}
              style={{
                ...this.props.cardStyle,
                margin: '8px 16px',
                marginLeft: 0,
              }}
              onClick={() => this.viewEvent(this.props.route, element)}
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

export default connect(
  state => ({}),
  dispatch => ({
    onViewEvent: (route, eventData) => {
      dispatch(sendModalEventData(eventData))
      dispatch(push(route.url.replace('%', eventData.id)))
    },
  })
)(SliderContainer)
