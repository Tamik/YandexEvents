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
  <div>
    <Slider dots title='Концерт на Красной площади'>
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
    <div style={{ marginLeft: 16 }}>
      <Slider>
        <Card size='medium' src='http://andrive.ru/wp-content/uploads/2016/05/orig-600x386.jpg' />
        <Card size='medium' src='http://andrive.ru/wp-content/uploads/2016/05/orig-600x386.jpg' />
        <Card size='medium' src='http://andrive.ru/wp-content/uploads/2016/05/orig-600x386.jpg' />
      </Slider>
    </div>
    {/* Block categories */}
  </div>
)

export default connect()(Feed)
