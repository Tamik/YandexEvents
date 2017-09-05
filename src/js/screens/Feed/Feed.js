import React from 'react'

import { EventsList, SliderList, AvatarsList } from 'containers'


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
      .then((response) => {
        response.data.data[0].title = 'Парк Горького'
        response.data.data[1].title = 'Парк Сокольники'
        response.data.data[2].title = 'ВДНХ'
        this.setState({ sliderData: response.data.data })
      })
  }

  render() {
    return (
      <div style={{ paddingBottom: 68 }}>
        <EventsList payload={this.state.data} />
        <SliderList title='Любимые места москвичей' payload={this.state.sliderData} />
        <EventsList payload={this.state.data} />
        <AvatarsList payload={this.state.data} />
      </div>
    )
  }
}

export default connect()(Feed)
