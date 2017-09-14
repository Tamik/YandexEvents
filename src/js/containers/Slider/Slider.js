import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { push } from 'actions/navigationActions'
import { sendModalEventData, sendModalPlaceData, sendModalEntityData } from 'actions/dataActions'

import { SlideCard, Slider, Spinner } from 'ui-components'

import { DataApi } from 'utils'

import style from './styles.scss'

class SliderContainer extends Component {
  state = {
    elements: [],
    route: {},
    loading: true,
  }

  componentWillMount() {
    DataApi
      .prepareQuery(this.props.params)
      .perform()
      .then(response => this.setState({
        elements: response.data.data,
        route: this.props.route,
        loading: false,
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
        }}
      >
        {this.state.loading
          ? (<Spinner />)
          : (
            <div className={style.slider_animate}>
              {this.props.title
                ? <h3
                  style={{
                    fontSize: '1rem',
                    margin: '40px 0 6px 16px',
                    lineHeight: '1.25rem',
                  }}
                >{this.props.title}</h3>
                : null
              }
              <Slider>
                {this.state.elements.map(element => (
                  <div style={{ paddingLeft: 16 }}>
                    <SlideCard
                      key={element.id}
                      title={element.title}
                      src={`${element.photo_small}`}
                      location={element.location_title}
                      size={this.props.cardSize}
                      style={{
                        ...this.props.cardStyle,
                      }}
                      onClick={() => this.viewEvent(this.state.route.url, element)}
                    />
                  </div>
                ))}
              </Slider>
            </div>
          )
        }
      </div>
    )
  }
}

SliderContainer.defaultProps = {
  route: {},
  title: null,
  style: {},
  cardSize: 'small',
  cardStyle: {},
  params: {},
}

SliderContainer.propTypes = {
  onViewEvent: PropTypes.func.isRequired,
  route: PropTypes.shape(),
  title: PropTypes.string,
  style: PropTypes.shape(),
  cardSize: PropTypes.string,
  cardStyle: PropTypes.shape(),
  params: PropTypes.shape(),
}

export default connect(
  state => ({}),
  dispatch => ({
    onViewEvent: (route, element) => {
      if (/event/.test(route)) {
        dispatch(sendModalEventData(element))
      }
      if (/place/.test(route)) {
        dispatch(sendModalPlaceData(element))
      }
      if (/entity/.test(route)) {
        dispatch(sendModalEntityData(element))
      }

      dispatch(push(route.replace('%', element.id)))
    },
  })
)(SliderContainer)
