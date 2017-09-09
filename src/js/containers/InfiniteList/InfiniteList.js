import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { push } from 'actions/navigationActions'
import { sendModalEventData } from 'actions/dataActions'

import { Button, Card, Spinner } from 'ui-components'
import styleBtn from 'ui-components/Button/style.scss'

import { DataApi } from 'utils/DataApi'

// @todo: pass to contants
const EVENTS_PER_PAGE = 10

class InfiniteListContainer extends Component {
  state = {
    elements: [],
    route: {},
    page: 1,
    loadingMoreEvents: false,
    hideBtnMore: false,
  }

  componentWillMount() {
    this.getData(this.props, 1)
  }

  componentWillUpdate(nextProps) {
    const isCategoryEqual = this.props.categoryId === nextProps.categoryId
    const isFilterByDateEqual = this.props.filterByDate === nextProps.filterByDate

    if (!isCategoryEqual || !isFilterByDateEqual) {
      this.getData(nextProps)
    }
  }

  getData = (props, page, newPage) => {
    const getEventsRequest = DataApi.getEvents().byHoliday(1)

    if (props.filterByDate) {
      getEventsRequest.byDate(props.filterByDate)
    }

    if (page) {
      getEventsRequest.page(page)
    }

    getEventsRequest
      .byCategory(props.categoryId)
      .perform()
      .then((response) => {

        let newStateArray = response.data.data

        if (newPage) {
          newStateArray = [
            ...this.state.elements.slice(),
            ...response.data.data,
          ]
        }

        this.setState({
          elements: newStateArray,
          route: { url: '/events/%' },
          hideBtnMore: response.data.data.length < EVENTS_PER_PAGE,
        })
      }
      )

    this.prevPage = page
  }

  loadMore = () => {
    this.setState({
      page: this.state.page + 1,
    })
    this.getData(this.props, this.state.page + 1, true)
  }

  viewEvent = (route, eventData) => {
    this.props.onViewEvent(route, eventData)
  }

  render() {
    return (
      <div
        style={{
          ...this.props.style,
          margin: 16,
          marginTop: 0,
          marginBottom: this.props.categoryId ? 16 * 4 : 16,
        }}
      >
        {this.props.title
          ? <h3
            style={{
              fontSize: '1.25rem',
              margin: '16px 0',
            }}
          >{this.props.title}</h3>
          : null
        }
        {this.state.elements.length === 0
          ? <p style={{ fontSize: 14 }}>Нет событий</p>
          : ''}
        {this.state.elements.map(element => (
          <Card
            key={element.id}
            title={element.title}
            src={`${element.photo_small}`}
            location={element.location_title}
            size='medium'
            isLeft={element.is_left}
            style={{
              ...this.props.cardStyle,
              marginBottom: 20,
            }}
            onClick={() => this.viewEvent(this.state.route.url, element)}
            date={`${element.dateFormatted.day} ${element.dateFormatted.month} ${element.dateFormatted.time} `}
          />
        ))}
        {
          this.state.loadingMoreEvents
            ? <Spinner />
            : this.state.elements.length === EVENTS_PER_PAGE && !this.state.hideBtnMore
              ? <Button
                label='Показать ещё'
                onClick={() => this.loadMore()}
                className={styleBtn.button}
              /> : ''
        }
      </div>
    )
  }
}

InfiniteListContainer.propTypes = {
  title: PropTypes.string,
  style: PropTypes.object,
  cardSize: PropTypes.string,
  cardStyle: PropTypes.object,
  params: PropTypes.object,
  categoryId: PropTypes.string,
}

export default connect(
  state => ({}),
  dispatch => ({
    onViewEvent: (route, element) => {
      dispatch(sendModalEventData(element))
      dispatch(push(route.replace('%', element.id)))
    },
  })
)(InfiniteListContainer)
