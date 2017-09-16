import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
  Blank as BlankContainer,
  Carousel as CarouselContainer,
  Hint as HintContainer,
  List as ListContainer,
  Slider as SliderContainer,
} from 'containers'

/**
 * @class Constructor
 * @description Конструктор ленты
 */
class Constructor extends Component {
  /**
   * @static propTypes
   */
  static propTypes = {
    config: PropTypes.shape().isRequired,
  }

  /**
   * @method renderListContainer
   * @description Рендер компонента ListContainer
   * @param {Object} props
   * @return {Component}
   */
  renderListContainer = props => (
    <ListContainer {...props} />
  )

  /**
   * @method renderSliderContainer
   * @description Рендер компонента SliderContainer
   * @param {Object} props
   * @return {Component}
   */
  renderSliderContainer = props => (
    <SliderContainer {...props} />
  )

  /**
   * @method renderCarouselContainer
   * @description Рендер компонента CarouselContainer
   * @param {Object} props
   * @return {Component}
   */
  renderCarouselContainer = props => (
    <CarouselContainer {...props} />
  )

  /**
   * @method renderHintContainer
   * @description Рендер компонента HintContainer
   * @param {Object} props
   * @return {Component}
   */
  renderHintContainer = props => (
    <HintContainer {...props} />
  )

  /**
   * @method renderBlankContainer
   * @description Рендер компонента BlankContainer
   * @param {Object} props
   * @return {Component}
   */
  renderBlankContainer = props => (
    <BlankContainer {...props} />
  )

  /**
   * @method renderFactory
   * @description "Фабрика" рендера компонентов в соответствии с заданной конфигурацией
   * @param {Object} payload
   * @param {Object} styles
   */
  renderFactory = (payload, styles) => (
    payload.map((container) => {
      const settings = {
        key: container.id,
        title: container.params.title,
        params: {
          ...container.data,
          key: container.id,
        },
        route: container.route,
        child: {
          type: container.child.type,
          style: container.child.style,
          params: container.child.params,
        },
        style: styles[container.name],
      }

      switch (container.type) {
        case 'carousel': return this.renderCarouselContainer({ ...settings })
        case 'hint': return this.renderHintContainer({
          key: container.id,
          params: {
            ...container.data,
            key: container.id,
          },
          style: styles[container.name],
        })
        case 'slider': return this.renderSliderContainer({ ...settings })
        default: return this.renderListContainer({ ...settings })
      }
    })
  )

  render() {
    return (
      <div>
        {this.renderFactory(
          this.props.config.containers,
          this.props.config.style,
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
