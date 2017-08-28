import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import style from './Feed.scss'

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

const Feed = props => (
  <div className='transition-item screen'>
    <div className={style['page-inner']}>
      <div className={style['tabs']}>
        <div className={style['tabs__inner']}>
          <div className={`${style['tabs__tab']} ${style['tabs__tab_active']}`}>Лента</div>
          <div className={style['tabs__tab']}>Карта</div>
        </div>
      </div>

      <div className={style['content']}>
        <div className={style['events-list']}>
          {
            payloadEventsListJSON.map((item, index) => {
              return (
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
              )
            })
          }
        </div>
      </div>
    </div>
    <Link to='/onboarding' style={{ color: '#999', position: 'absolute', bottom: 0 }}>&lt; Goto Screen OnBoarding</Link>
  </div>
)

export default connect()(Feed)
