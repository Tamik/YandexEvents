import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'

import { push, replace } from 'actions/navigationActions'
import { sendModalEventData } from 'actions/dataActions'
import { setViewMode } from 'actions/viewActions'
import { VIEW_MODE_LIST, VIEW_MODE_MAP } from 'consts/viewModes'

import { FloatingButton } from 'ui-components'

import { EventsList } from 'containers'
import { Map } from 'screens'

import style from './style.scss'

import { List as ListContainer } from 'containers'

class Category extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [],
    }

    this.viewMode = this.props.params.viewMode.toUpperCase()

    if (!props.categoryData) {
      // load data from server by categoryId
      console.log('Load events from server by category id: ', props)
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

  toggleViewMode = () => {
    this.viewMode = this.viewMode === VIEW_MODE_LIST ? VIEW_MODE_MAP : VIEW_MODE_LIST
    this.props.onViewModeChanged(
      this.props.params.categoryId,
      this.viewMode
    )
  }

  render() {
    return (
      <div>
        {
          this.viewMode === VIEW_MODE_LIST
            ? <ListContainer categoryId={this.props.params.categoryId} />
            : <Map />
        }
        <FloatingButton
          title={this.viewMode === VIEW_MODE_LIST ? 'Карта' : 'Список'}
          onClick={this.toggleViewMode}
        />
      </div>
    )
  }
}

export default connect(
  state => ({
    categoryData: state.data.categoryData,
    view: state.view,
  }),
  dispatch => ({
    onViewModeChanged: (currCategoryId, newViewMode) => {
      dispatch(setViewMode(newViewMode))
      dispatch(replace(`/category/${currCategoryId}/${newViewMode.toLowerCase()}`))
    },
  })
)(Category)
