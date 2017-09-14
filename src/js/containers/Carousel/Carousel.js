import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { push } from 'actions/navigationActions'
import { sendModalEventData, sendModalPlaceData, sendModalEntityData } from 'actions/dataActions'

import { Carousel, Spinner } from 'ui-components'
import { AvatarsList } from 'containers'
import style from 'components/List/style.scss'

import { DataApi } from 'utils'

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
      <div style={this.props.style} className={style.carousel_animate}>
        {this.state.loading
          ? (<Spinner />)
          : (
            <div className={style.list__wrap}>
              {this.props.title
                ? <h3
                  style={{
                    fontSize: '1rem',
                    margin: '40px 16px 10px',
                    lineHeight: '1.25rem',
                  }}
                >{this.props.title}</h3>
                : null
              }
              <Carousel>
                <AvatarsList payload={this.state.elements} />
              </Carousel>
            </div>
          )
        }
      </div>
    )
  }
}

CarouselContainer.defaultProps = {
  title: null,
  style: {},
  // cardSize: 'small',
  // cardStyle: {},
}

CarouselContainer.propTypes = {
  onViewEvent: PropTypes.func.isRequired,
  title: PropTypes.string,
  style: PropTypes.shape(),
  // cardSize: PropTypes.string,
  // cardStyle: PropTypes.shape(),
  params: PropTypes.shape().isRequired,
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
)(CarouselContainer)
