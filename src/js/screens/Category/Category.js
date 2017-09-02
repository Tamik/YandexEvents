import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { push, replace } from 'actions/navigationActions'
import { sendModalEventData } from 'actions/dataActions'
import { setViewMode } from 'actions/viewActions'
import { VIEW_MODE_LIST, VIEW_MODE_MAP } from 'consts/viewModes'

import style from './style.scss'

const payloadEventsListJSON = [
  {
    "id": 1,
    "title": "Event 1",
    "image": {
      "small": {
        "src": "https://img2.goodfon.ru/original/320x400/3/a0/daft-punk-daft-pank-tomas-2560.jpg"
      }
    }
  },
  {
    "id": 2,
    "title": "Event 2",
    "image": {
      "small": {
        "src": "http://www.secureworldme.com/asset/images/portfolio/events.jpg"
      }
    }
  },
  {
    "id": 3,
    "title": "Event 3",
    "image": {
      "small": {
        "src": "http://www.northcobbphotoclub.com/uploads/2/4/2/0/24207577/8109020_orig.jpg"
      }
    }
  },
  {
    "id": 4,
    "title": "Event 4",
    "image": {
      "small": {
        "src": "http://www.northcobbphotoclub.com/uploads/2/4/2/0/24207577/4034355_orig.jpg"
      }
    }
  },
]

class Category extends Component {
  constructor(props) {
    super(props)

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
  }

  viewEvent = (eventData) => {
    this.props.onViewEvent(eventData)
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
        <button
          onClick={() => {
            this.toggleViewMode()
          }}
          style={{ fontSize: 14, padding: 10 }}
        >Map/List toggle</button>
        {
          this.viewMode === VIEW_MODE_LIST
            ? <div className={style['events-list']}>
              {
                payloadEventsListJSON.map((item, index) => {
                  return (
                    <div
                      role='button'
                      key={item.id}
                      className={`${style['events-list__item']}`}
                      onClick={() => {
                        this.viewEvent(item)
                      }}
                    >
                      <div className={`${style['card-small__image-wrap']} ${style['image-fit-wrap']}`}>
                        <img
                          src={item.image.small.src}
                          alt=''
                          className={style['image-fit-wrap__image-fitted']}
                        />
                      </div>
                      <div className={style['card-small__meta']}>
                        <h3 className={`${style['events-list__item-title']}`}>{item.title}</h3>
                      </div>
                    </div>
                  )
                })
              }
            </div>
            : <div>Map</div>
        }
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
    onViewEvent: (eventData) => {
      dispatch(sendModalEventData(eventData))
      dispatch(push(`/event/${eventData.id}`))
    },
    onViewModeChanged: (currCategoryId, newViewMode) => {
      dispatch(setViewMode(newViewMode))
      dispatch(replace(`/category/${currCategoryId}/${newViewMode.toLowerCase()}`))
    },
  })
)(Category)
