import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import { EventsList, SliderList, AvatarsList } from 'containers'

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
      <div style={{ marginLeft: 16, marginBottom: 16 }}>
        <EventsList payload={this.state.data} />
        <SliderList title='Любимые места москвичей' payload={this.state.data} />
        <EventsList payload={this.state.data} />
        <AvatarsList payload={this.state.data} />
      </div>
    )
  }
}

export default connect()(Feed)
