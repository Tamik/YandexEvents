import React from 'react'

import { EventsList, SliderList } from 'containers'


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
        <EventsList payload={this.state.data} />
      </div>
    )
  }
}

export default connect()(Feed)
