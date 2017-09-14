import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { push } from 'actions/navigationActions'
import { sendModalEventData, sendModalPlaceData, sendModalEntityData } from 'actions/dataActions'

import { Avatar, Card, Spinner } from 'ui-components'

import { DataApi } from 'utils'

class ListContainer extends Component {
  state = {
    elements: [],
    route: {},
    loading: true,
  }

  componentWillMount() {
    this.getData(this.props)
  }

  componentWillUpdate(nextProps) {
    const isCategoryEqual = this.props.categoryId === nextProps.categoryId
    const isFilterByDateEqual = this.props.filterByDate === nextProps.filterByDate

    if (!isCategoryEqual || !isFilterByDateEqual) {
      this.getData(nextProps)
    }
  }

  getData = (props) => {
    let routePath

    switch (props.params.method) {
      case 'places': routePath = '/place/%'
        break
      case 'entities': routePath = '/entity/%'
        break
      default: routePath = '/event/%'
        break
    }

    DataApi
      .prepareQuery(props.params)
      .perform()
      .then(response => this.setState({
        elements: response.data.data,
        route: routePath,
        loading: false,
      }))
  }

  viewEvent = (route, eventData) => {
    this.props.onViewEvent(route, eventData)
  }

  renderAvatar = props => (
    <Avatar {...props} />
  )
  renderCard = props => (
    <Card {...props} />
  )
  renderFactory = payload => (
    payload.map((element) => {
      switch (payload.child.type) {
        case 'avatar': return this.renderAvatar({
          key: element.id,
          src: element.photo_small,
          title: element.title,
          style: {
            ...element.style,
          },
          onClick: () => this.viewEvent(this.state.route, element),
        })
        default: return this.renderCard({
          key: element.id,
          title: element.title,
          src: element.photo_small,
          location: element.location_title,
          date: `${element.dateFormatted.day} ${element.dateFormatted.month} ${element.dateFormatted.time}`,
          style: {
            ...element.style,
          },
          onClick: () => this.viewEvent(this.state.route, element),
        })
      }
    })
  )

  render() {
    return (
      <div
        style={{
          ...this.props.style,
          margin: 16,
          marginBottom: this.props.categoryId ? 16 * 4 : 16,
        }}
      >
        {this.state.loading
          ? (<Spinner />)
          : (
            <div>
              {this.props.title
                ? <h3
                  style={{
                    fontSize: '1rem',
                    margin: '36px 0 10px',
                    lineHeight: '1.25rem',
                  }}
                >{this.props.title}</h3>
                : null
              }
              {this.state.elements.map((element, index) => (
                <Card
                  key={element.id}
                  title={element.title}
                  src={`${element.photo_small}`}
                  location={element.location_title}
                  size='medium'
                  style={{
                    ...this.props.cardStyle,
                    marginBottom: 20,
                    animationDelay: `${index * 200}ms`,
                  }}
                  onClick={() => this.viewEvent(this.state.route, element)}
                  date={`${element.dateFormatted.day} ${element.dateFormatted.month} ${element.dateFormatted.time} `}
                />
              ))}
            </div>
          )
        }
      </div>
    )
  }
}

ListContainer.defaultProps = {
  title: null,
  style: {},
  // cardSize: 'small',
  cardStyle: {},
  // params: {},
  categoryId: null,
}

ListContainer.propTypes = {
  onViewEvent: PropTypes.func.isRequired,
  title: PropTypes.string,
  style: PropTypes.shape(),
  // cardSize: PropTypes.string,
  cardStyle: PropTypes.shape(),
  // params: PropTypes.shape(),
  categoryId: PropTypes.string,
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
)(ListContainer)
