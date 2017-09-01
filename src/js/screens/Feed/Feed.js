import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { push } from 'actions/navigationActions'
import { sendModalEventData, sendModalCategoryData, sendModalPlaceData } from 'actions/dataActions'

import { Tabs, Container, Slider, Carousel, Card, Image, Avatar } from 'ui-components'

import style from './style.scss'

const payloadEventsListJSON = [
  {
    id: 1,
    title: 'Event 1',
    image: {
      small: {
        src: 'https://img2.goodfon.ru/original/320x400/3/a0/daft-punk-daft-pank-tomas-2560.jpg',
      },
    },
  },
  {
    id: 2,
    title: 'Event 2',
    image: {
      small: {
        src: 'http://www.secureworldme.com/asset/images/portfolio/events.jpg',
      },
    },
  },
  {
    id: 3,
    title: 'Event 3',
    image: {
      small: {
        src: 'http://www.northcobbphotoclub.com/uploads/2/4/2/0/24207577/8109020_orig.jpg',
      },
    },
  },
]

const Feed = (props) => {
  const viewEvent = (eventData) => {
    props.onViewEvent(eventData)
  }
  const viewCategory = (categoryData) => {
    props.onViewCategory(categoryData)
  }
  const viewPlace = (placeData) => {
    props.onViewPlace(placeData)
  }
  return (
    <div>
      <Slider dots>
        <div><Image size='large' src='http://krasivye-mesta.ru/img/Night-Moscow.jpg' /></div>
        <div><Image size='large' src='http://andrive.ru/wp-content/uploads/2016/05/orig-600x386.jpg' /></div>
        <div><Image size='large' src='http://lifeglobe.net/x/entry/472/2817506_large_3.jpg' /></div>
      </Slider>
      <div
        className={style['events-list']}
      >
        {
          payloadEventsListJSON.map((item, index) => {
            return (
              <div
                role='button'
                key={item.id}
                className={`${style['events-list__item']}`}
                onClick={() => {
                  viewEvent(item)
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

      <br /> <br />

      <div style={{ display: 'flex' }}>
        <div
          role='button'
          onClick={() => {
            viewCategory({ id: 1, title: 'Category 1' })
          }}
          style={{ display: 'block', width: 56, height: 56 }}
        >Cat1</div>
        <div
          role='button'
          onClick={() => {
            viewCategory({ id: 2, title: 'Category 2' })
          }}
          style={{ display: 'block', width: 56, height: 56 }}
        >Cat2</div>
        <div
          role='button'
          onClick={() => {
            viewCategory({ id: 2, title: 'Category 2' })
          }}
          style={{ display: 'block', width: 56, height: 56 }}
        >Cat3</div>
      </div>

      <br /> <br />

      <div style={{ display: 'flex' }}>
        <div
          role='button'
          onClick={() => {
            viewPlace({ id: 1, title: 'Place 1' })
          }}
          style={{ display: 'block', width: 56, height: 56 }}
        >Place 1</div>
        <div
          role='button'
          onClick={() => {
            viewPlace({ id: 2, title: 'Place 2' })
          }}
          style={{ display: 'block', width: 56, height: 56 }}
        >Place 2</div>
        <div
          role='button'
          onClick={() => {
            viewPlace({ id: 2, title: 'Place 2' })
          }}
          style={{ display: 'block', width: 56, height: 56 }}
        >Place 3</div>
      </div>

      <br /> <br /> <br />
    </div>
  )
}

export default connect(
  state => ({
    state, /* contains: user, router, data @todo: exclude superfluous */
  }),
  dispatch => ({
    onViewEvent: (eventData) => {
      dispatch(sendModalEventData(eventData))
      dispatch(push(`/event/${eventData.id}`))
    },
    onViewCategory: (categoryData) => {
      dispatch(sendModalCategoryData(categoryData))
      dispatch(push(`/category/${categoryData.id}`))
    },
    onViewPlace: (placeData) => {
      dispatch(sendModalPlaceData(placeData))
      dispatch(push(`/place/${placeData.id}`))
    },
  })
)(Feed)
