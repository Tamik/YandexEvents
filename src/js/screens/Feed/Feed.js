import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { Container, Tabs } from 'ui-components'
import style from './style.scss'
import styleTabs from 'ui-components/Tabs/style.scss'

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
    <Tabs>
      <div className={`${styleTabs['tabs__item']} ${styleTabs['tabs__item_active']}`}>Лента</div>
      <div className={styleTabs['tabs__item']}>Карта</div>
    </Tabs>
    <Container scrolling stretching>
      {/* Block places */}
      <div style={{ display: 'flex' }}>
        <Link to='' style={{ display: 'block', width: 56, height: 56 }}>Place1</Link>
        <Link to='' style={{ display: 'block', width: 56, height: 56 }}>Place2</Link>
        <Link to='' style={{ display: 'block', width: 56, height: 56 }}>Place3</Link>
      </div>

      {/* Block events */}
      <div className={style['events-list']}>
        {
          payloadEventsListJSON.map((item, index) => {
            return (
              <Link key={item.id} to='/event' onClick={() => props.dispatch({ type: 'SEND_TO_EVENT', payload: item })}>
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
      </div>

      {/* Block categories */}
      <div style={{ display: 'flex' }}>
        <Link to='/category/1' style={{ display: 'block', width: 56, height: 56 }}>Cat1</Link>
        <Link to='/category/2' style={{ display: 'block', width: 56, height: 56 }}>Cat2</Link>
        <Link to='/category/3' style={{ display: 'block', width: 56, height: 56 }}>Cat3</Link>
      </div>
      <br /><br /><br />
    </Container>
    <Link to='/onboarding' style={{ color: '#999', position: 'absolute', bottom: 0 }}>&lt; Goto Screen OnBoarding</Link>
  </div>
)

export default connect()(Feed)
