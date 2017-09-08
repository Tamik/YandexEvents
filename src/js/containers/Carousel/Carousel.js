import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { push } from 'actions/navigationActions'
import { sendModalEventData } from 'actions/dataActions'

import { Card, Carousel, Spinner } from 'ui-components'

import { DataApi } from 'utils/DataApi'

class CarouselContainer extends Component {
  state = {
    elements: [],
    loading: true,
  }

  componentWillMount() {
    DataApi
      .prepareQuery(this.props.params)
      .perform()
      .then(response => this.setState({
        elements: response.data.data,
        loading: false,
      }))
  }

  viewEvent = (route, element) => {
    this.props.onViewEvent(route, element)
  }

  render() {
    return (
      <div style={this.props.style}>
        {this.state.loading
          ? (<Spinner />)
          : (
            <div>
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
                      onClick={() => this.viewEvent(this.props.route.url, element)}
                    />
                  ))}
                </div>
              </Carousel>
            </div>
          )
        }
      </div>
    )
  }
}

CarouselContainer.propTypes = {
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
)(CarouselContainer)
