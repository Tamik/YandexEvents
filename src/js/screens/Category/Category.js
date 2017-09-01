import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { push, goBack } from 'actions/navigationActions'
import { sendModalEventData } from 'actions/dataActions'

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

    if (!props.categoryData) {
      // load data from server by categoryId
      console.log('Load events from server by category id: ', props.params.id)
    }
    else {
      console.log('categoryData: ', props.categoryData)
    }

    this.viewEvent = this.viewEvent.bind(this)
    this.goBack = this.goBack.bind(this)
  }

  componentDidMount() {
    // 
  }

  viewEvent = (eventData) => {
    this.props.onViewEvent(eventData)
  }

  goBack = () => {
    this.props.goBack()
  }

  render() {
    return (
      <div className='transition-item screen'>
        <div className={`${style['page-inner']}`}>
          <button onClick={this.goBack}>GoBack</button>
          <h3>Category</h3>
          <div>
            <div className={style['events-list']}>
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
          </div>
        </div>
      </div>
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
