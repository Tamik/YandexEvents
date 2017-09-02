import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import { EventsList, SliderList } from 'containers'

import { Tabs, Container, Slider, Carousel, Card, Image, Avatar } from 'ui-components'
import styleTabs from 'ui-components/Tabs/style.scss'
import style from './style.scss'

class Feed extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [],
      sliderData: [],
      carouselData: [],
    }
  }

  componentDidMount() {
    axios.get('http://io.yamblz.ru/events', { params: { items_per_page: 3 } })
      .then(response => this.setState({ data: response.data.data }))
    axios.get('http://io.yamblz.ru/events', { params: { items_per_page: 3, page: 2 } })
      .then(response => this.setState({ sliderData: response.data.data }))
  }

  render() {
    return (
      <div>
        <Slider dots title='Концерт на Красной площади'>
          <div><Image size='large' src='http://krasivye-mesta.ru/img/Night-Moscow.jpg' /></div>
          <div><Image size='large' src='http://andrive.ru/wp-content/uploads/2016/05/orig-600x386.jpg' /></div>
          <div><Image size='large' src='http://lifeglobe.net/x/entry/472/2817506_large_3.jpg' /></div>
        </Slider>
        <Carousel>
          <div style={{ margin: '16px 0' }}>
            <div style={{ margin: '0 16px', padding: '23px', paddingBottom: '10px', backgroundColor: '#f2f2f2' }}>
              <Avatar text='С детьми' size='medium' src='http://1.bp.blogspot.com/-z_oHLfIB4bQ/To2xXFpZwTI/AAAAAAAAUqo/iiGX6Su88Yw/s1600/pezinho5.png' />
            </div>
            <div style={{ margin: '0 16px', padding: '23px', paddingBottom: '10px', backgroundColor: '#f2f2f2' }}>
              <Avatar text='С детьми' size='medium' src='http://1.bp.blogspot.com/-z_oHLfIB4bQ/To2xXFpZwTI/AAAAAAAAUqo/iiGX6Su88Yw/s1600/pezinho5.png' />
            </div>
            <div style={{ margin: '0 16px', padding: '23px', paddingBottom: '10px', backgroundColor: '#f2f2f2' }}>
              <Avatar text='С детьми' size='medium' src='http://1.bp.blogspot.com/-z_oHLfIB4bQ/To2xXFpZwTI/AAAAAAAAUqo/iiGX6Su88Yw/s1600/pezinho5.png' />
            </div>
            <div style={{ margin: '0 16px', padding: '23px', paddingBottom: '10px', backgroundColor: '#f2f2f2' }}>
              <Avatar text='С детьми' size='medium' src='http://1.bp.blogspot.com/-z_oHLfIB4bQ/To2xXFpZwTI/AAAAAAAAUqo/iiGX6Su88Yw/s1600/pezinho5.png' />
            </div>
          </div>
        </Carousel>
        <EventsList payload={this.state.data} />
        <div style={{ marginLeft: 16 }}>
          <SliderList payload={this.state.sliderData} />
        </div>
        <Carousel>
          <div style={{ margin: '16px 0' }}>
            <div style={{ margin: '0 16px' }}>
              <Avatar text='Виктор Басков' size='small' src='http://1.bp.blogspot.com/-z_oHLfIB4bQ/To2xXFpZwTI/AAAAAAAAUqo/iiGX6Su88Yw/s1600/pezinho5.png' />
            </div>
            <div style={{ margin: '0 16px' }}>
              <Avatar text='Виктор Басков' size='small' src='http://1.bp.blogspot.com/-z_oHLfIB4bQ/To2xXFpZwTI/AAAAAAAAUqo/iiGX6Su88Yw/s1600/pezinho5.png' />
            </div>
            <div style={{ margin: '0 16px' }}>
              <Avatar text='Виктор Басков' size='small' src='http://1.bp.blogspot.com/-z_oHLfIB4bQ/To2xXFpZwTI/AAAAAAAAUqo/iiGX6Su88Yw/s1600/pezinho5.png' />
            </div>
            <div style={{ margin: '0 16px' }}>
              <Avatar text='Виктор Басков' size='small' src='http://1.bp.blogspot.com/-z_oHLfIB4bQ/To2xXFpZwTI/AAAAAAAAUqo/iiGX6Su88Yw/s1600/pezinho5.png' />
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
  }
}

export default connect()(Feed)
