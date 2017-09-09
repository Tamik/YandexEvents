import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { push } from 'actions/navigationActions'
import { sendModalEventData } from 'actions/dataActions'

import { Carousel, Spinner } from 'ui-components'
import { List } from 'components'
import style from 'components/List/style.scss'

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
                <div>
                  {this.state.elements.map(element => (
                    // <AvatarsList key={element.id} title={element.title} />
                    <List key={element.id} type='slider_avatars' data={element} />
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
