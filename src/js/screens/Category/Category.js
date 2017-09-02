import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'

import { push, goBack } from 'actions/navigationActions'
import { sendModalEventData } from 'actions/dataActions'

import { EventsList } from 'containers'
import style from './style.scss'

class Category extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [],
    }

    if (!props.categoryData) {
      // load data from server by categoryId
      console.log('Load events from server by category id: ', props.params.id)
    }
    else {
      console.log('categoryData: ', props.categoryData)
    }
  }

  componentDidMount() {
    axios.get('http://io.yamblz.ru/events', { params: { items_per_page: 3 } })
      .then(response => this.setState({ data: response.data.data }))
    axios.get('http://io.yamblz.ru/events', { params: { items_per_page: 3, page: 2 } })
      .then(response => this.setState({ sliderData: response.data.data }))
  }

  viewEvent = (eventData) => {
    this.props.onViewEvent(eventData)
  }

  goBack = () => {
    this.props.goBack()
  }

  render() {
    return (
      <EventsList payload={this.state.data} />
    )
  }
}

export default connect(
  state => ({
    categoryData: state.data.categoryData,
  }),
  dispatch => ({
    onViewEvent: (eventData) => {
      dispatch(sendModalEventData(eventData))
      dispatch(push(`/event/${eventData.id}`))
    },
    goBack: () => {
      dispatch(goBack())
    },
  })
)(Category)
