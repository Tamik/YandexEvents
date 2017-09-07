import React, { Component } from 'react'
import { connect } from 'react-redux'

import { push, replace } from 'actions/navigationActions'
import { sendModalEventData } from 'actions/dataActions'
import { setViewMode } from 'actions/viewActions'
import { VIEW_MODE_LIST, VIEW_MODE_MAP } from 'consts/viewModes'

import { FloatingButton } from 'ui-components'

import { List as ListContainer } from 'containers'
import { Map } from 'screens'

import style from './style.scss'

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
          label={this.viewMode === VIEW_MODE_LIST ? 'Карта' : 'Список'}
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
