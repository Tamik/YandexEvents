import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { replace } from 'actions/navigationActions'
import { setViewMode } from 'actions/viewActions'

import { InfiniteList as InfiniteListContainer } from 'containers'

import { FloatingButton } from 'ui-components'

import { DataApi } from 'utils/DataApi'

import style from './style.scss'

class Category extends Component {
  constructor(props) {
    super(props)

    this.state = {
      filterByDate: null,
      holiDates: [],
    }
  }

  componentWillMount() {
    this.getHoliDates(this.props)
  }

  componentWillUpdate(nextProps) {
    const isCategoryEqual = this.props.params.categoryId === nextProps.params.categoryId

    if (!isCategoryEqual) {
      this.getHoliDates(nextProps)
    }
  }

  getHoliDates(props) {
    DataApi.getDatesWithEvents()
      .byHoliday(1)
      .byCategory(props.params.categoryId)
      .perform()
      .then((response) => {
        this.setState({
          holiDates: response.data.data,
        })
      })
  }

  filterByDate = (date) => {
    if (date !== this.state.filterByDate) {
      this.setState({
        filterByDate: date,
      })
      return
    }
    this.setState({
      filterByDate: null,
    })
  }

  render() {
    return (
      <div>
        {
          this.state.holiDates.length > 1
            ? <div style={{ padding: '16px 16px 16px 16px', display: 'flex' }}>
              {this.state.holiDates.map((item) => {
                return (
                  <button
                    key={item.date}
                    type='button'
                    className={`${style.filter_date} ${this.state.filterByDate === item.date ? style.filter_date__active : ''}`}
                    onClick={() => {
                      this.filterByDate(item.date)
                    }}
                  >{item.dateFormatted.day} {item.dateFormatted.month}</button>
                )
              })}
              {this.state.holiDates.map(item => (
                <button
                  key={item.date}
                  type='button'
                  className={`${style.filter_date} ${this.state.filterByDate === item.date ? style.filter_date__active : ''}`}
                  onClick={() => {
                    this.filterByDate(item.date)
                  }}
                >{item.dateFormatted.day} {item.dateFormatted.month}</button>
              )
              )}
            </div>
            : ''
        }
        <InfiniteListContainer
          categoryId={this.props.params.categoryId}
          filterByDate={this.state.filterByDate}
        />
      </div>
    )
  }
}

Category.propTypes = {
  params: PropTypes.shape().isRequired,
}

export default Category
