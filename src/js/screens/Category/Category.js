import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { Container } from 'ui-components'
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

const Category = ({ match }) => (
  <div className='transition-item screen'>
    <Container stretching>
      <Link to='/feed'>Back</Link>
      <p>Category Title: Подумать, как передавать</p>
      {/* Возможно будет справочник категорий в store.categories 
        а также текущая категория и ее мета-данные были бы доступны 
        в store.category = { id, title, count, etc }
      */}
      <br />
      <p>CategoryID: {match.params.id}</p>
      {/*
        - load events by category
        - render
      */}
      <Container stretching scrolling>
        {
          payloadEventsListJSON.map((item, index) => {
            return (
              <Link key={item.id} to='/event' onClick={this.viewEvent}>
                <div key={item.id} className={`${style['events-list__item']}`}>
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
              </Link>
            )
          })
        }
      </Container>
    </Container>
  </div>
)

const mapStateToProps = store => ({
})

export default connect(mapStateToProps)(Category)
