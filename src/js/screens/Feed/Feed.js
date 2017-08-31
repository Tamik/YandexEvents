import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { Tabs, Container, Slider, Carousel, Card, Image, Avatar } from 'ui-components'
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
]

const Feed = props => (
  <div className='transition-item screen'>
    <Tabs>
      <div className={`${styleTabs['tabs__item']} ${styleTabs['tabs__item_active']}`}>Лента</div>
      <div className={styleTabs.tabs__item}>Карта</div>
    </Tabs>
    <Container scrolling stretching>
      <Slider dots>
        <div><Image size='large' src='http://krasivye-mesta.ru/img/Night-Moscow.jpg' /></div>
        <div><Image size='large' src='http://andrive.ru/wp-content/uploads/2016/05/orig-600x386.jpg' /></div>
        <div><Image size='large' src='http://lifeglobe.net/x/entry/472/2817506_large_3.jpg' /></div>
      </Slider>
      <Carousel>
        <div style={{ margin: '16px 0' }}>
          <div style={{ margin: '0 16px', padding: '23px', paddingBottom: '10px', backgroundColor: '#f2f2f2' }}>
            <Avatar text='С детьми' size='medium' src='http://1.bp.blogspot.com/-z_oHLfIB4bQ/To2xXFpZwTI/AAAAAAAAUqo/iiGX6Su88Yw/s1600/pezinho5.png'/>
          </div>
          <div style={{ margin: '0 16px', padding: '23px', paddingBottom: '10px', backgroundColor: '#f2f2f2' }}>
            <Avatar text='С детьми' size='medium' src='http://1.bp.blogspot.com/-z_oHLfIB4bQ/To2xXFpZwTI/AAAAAAAAUqo/iiGX6Su88Yw/s1600/pezinho5.png'/>
          </div>
          <div style={{ margin: '0 16px', padding: '23px', paddingBottom: '10px', backgroundColor: '#f2f2f2' }}>
            <Avatar text='С детьми' size='medium' src='http://1.bp.blogspot.com/-z_oHLfIB4bQ/To2xXFpZwTI/AAAAAAAAUqo/iiGX6Su88Yw/s1600/pezinho5.png'/>
          </div>
          <div style={{ margin: '0 16px', padding: '23px', paddingBottom: '10px', backgroundColor: '#f2f2f2' }}>
            <Avatar text='С детьми' size='medium' src='http://1.bp.blogspot.com/-z_oHLfIB4bQ/To2xXFpZwTI/AAAAAAAAUqo/iiGX6Su88Yw/s1600/pezinho5.png'/>
          </div>
        </div>
      </Carousel>
      <div style={{ marginLeft: 16 }}>
        <Slider>
          <Card size='medium' src='http://andrive.ru/wp-content/uploads/2016/05/orig-600x386.jpg' />
          <Card size='medium' src='http://andrive.ru/wp-content/uploads/2016/05/orig-600x386.jpg' />
          <Card size='medium' src='http://andrive.ru/wp-content/uploads/2016/05/orig-600x386.jpg' />
        </Slider>
      </div>
      {/* Block events */}
      <div className={style['events-list']}>
        {
          payloadEventsListJSON.map((item, index) => {
            return (
              <Link key={item.id} to='/event' onClick={() => props.dispatch({ type: 'SEND_TO_EVENT', payload: item })}>
                <Card key={item.id} size='small' />
              </Link>
            )
          })
        }
      </div>
      <Carousel>
        <div style={{ margin: '16px 0' }}>
          <div style={{ margin: '0 16px' }}>
            <Avatar text='Виктор Басков' size='small' src='http://1.bp.blogspot.com/-z_oHLfIB4bQ/To2xXFpZwTI/AAAAAAAAUqo/iiGX6Su88Yw/s1600/pezinho5.png'/>
          </div>
          <div style={{ margin: '0 16px' }}>
            <Avatar text='Виктор Басков' size='small' src='http://1.bp.blogspot.com/-z_oHLfIB4bQ/To2xXFpZwTI/AAAAAAAAUqo/iiGX6Su88Yw/s1600/pezinho5.png'/>
          </div>
          <div style={{ margin: '0 16px' }}>
            <Avatar text='Виктор Басков' size='small' src='http://1.bp.blogspot.com/-z_oHLfIB4bQ/To2xXFpZwTI/AAAAAAAAUqo/iiGX6Su88Yw/s1600/pezinho5.png'/>
          </div>
          <div style={{ margin: '0 16px' }}>
            <Avatar text='Виктор Басков' size='small' src='http://1.bp.blogspot.com/-z_oHLfIB4bQ/To2xXFpZwTI/AAAAAAAAUqo/iiGX6Su88Yw/s1600/pezinho5.png'/>
          </div>
        </div>
      </Carousel>
      <div className={style['events-list']}>
        {
          payloadEventsListJSON.map((item, index) => {
            return (
              <Link key={item.id} to='/event' onClick={() => props.dispatch({ type: 'SEND_TO_EVENT', payload: item })}>
                <Card key={item.id} size='small' />
              </Link>
            )
          })
        }
      </div>
      <div style={{ marginLeft: 16 }}>
        <Slider>
          <Card size='medium' src='http://andrive.ru/wp-content/uploads/2016/05/orig-600x386.jpg' />
          <Card size='medium' src='http://andrive.ru/wp-content/uploads/2016/05/orig-600x386.jpg' />
          <Card size='medium' src='http://andrive.ru/wp-content/uploads/2016/05/orig-600x386.jpg' />
        </Slider>
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
