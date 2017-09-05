import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  List as ListContainer,
  Slider as SliderContainer,
  Carousel as CarouselContainer,
  Hint as HintContainer,
} from 'containers'

class Constructor extends Component {
  renderListContainer = props => (
    <ListContainer
      key={props.id}
      title={props.params.title}
      style={props.style}
      cardStyle={props.cardStyle}
    />
  )

  renderSliderContainer = props => (
    <SliderContainer
      key={props.id}
      title={props.params.title}
      style={props.style}
      cardStyle={props.cardStyle}
    />
  )

  renderCarouselContainer = props => (
    <CarouselContainer
      key={props.id}
      title={props.params.title}
      style={props.style}
      cardStyle={props.cardStyle}
    />
  )

  renderHintContainer = props => (
    <HintContainer
      key={props.id}
      title={props.params.title}
      style={props.style}
      cardStyle={props.cardStyle}
    />
  )

  renderBlankContainer = props => (
    <div key={props.id}>
      {/* {props.params.title} */}
    </div>
  )

  renderFactory = (payload, styles, rootStyles) => (
    payload.map((container) => {
      switch (container.type) {
        case 'list': return this.renderListContainer({
          id: container.id,
          type: container.type,
          params: {
            title: container.params.title,
          },
          style: styles[container.name],
          cardStyle: rootStyles.card,
        })
        case 'carousel': return this.renderCarouselContainer({
          id: container.id,
          type: container.type,
          params: {
            title: container.params.title,
          },
          style: styles[container.name],
          cardStyle: rootStyles.card,
        })
        case 'slider': return this.renderSliderContainer({
          id: container.id,
          type: container.type,
          params: {
            title: container.params.title,
          },
          style: styles[container.name],
          cardStyle: rootStyles.card,
        })
        case 'hint': return this.renderHintContainer({
          id: container.id,
          type: container.type,
          params: {
            // title: container.params.title,
          },
          style: styles[container.name],
          cardStyle: rootStyles.card,
        })
        default: return this.renderBlankContainer({
          id: container.id,
          type: container.type,
          params: {
            title: container.params.title,
          },
          style: styles[container.name],
          cardStyle: rootStyles.card,
        })
      }
    })
  )

  render() {
    return (
      <div style={this.props.config.params.style.body}>
        {this.renderFactory(
          this.props.config.containers,
          this.props.config.style,
          this.props.config.params.style,
        )}
      </div>
    )
  }
}

export default connect(
  state => ({
    config: state.data.configData,
  }),
)(Constructor)
