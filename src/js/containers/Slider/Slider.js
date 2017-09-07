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
    route: {},
  }

  componentWillMount() {
    DataApi
      .prepareQuery(this.props.params)
      .perform()
      .then(response => this.setState({
        elements: response.data.data,
        route: this.props.route,
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
              onClick={() => this.viewEvent(this.state.route.url, element)}
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
    onViewEvent: (route, element) => {
      dispatch(sendModalEventData(element))
      dispatch(push(route.replace('%', element.id)))
    },
  })
)(SliderContainer)
