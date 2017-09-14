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
   * @method renderListContainer
   * @description Рендер компонента ListContainer
   * @param {Object} props
   * @returns {Component}
   */
  renderListContainer = props => (
    <ListContainer {...props} />
  )

  /**
   * @method renderSliderContainer
   * @description Рендер компонента SliderContainer
   * @param {Object} props
   * @returns {Component}
   */
  renderSliderContainer = props => (
    <SliderContainer {...props} />
  )

  /**
   * @method renderCarouselContainer
   * @description Рендер компонента CarouselContainer
   * @param {Object} props
   * @returns {Component}
   */
  renderCarouselContainer = props => (
    <CarouselContainer {...props} />
  )

  /**
   * @method renderHintContainer
   * @description Рендер компонента HintContainer
   * @param {Object} props
   * @returns {Component}
   */
  renderHintContainer = props => (
    <HintContainer {...props} />
  )

  /**
   * @method renderBlankContainer
   * @description Рендер компонента BlankContainer
   * @param {Object} props
   * @returns {Component}
   */
  renderBlankContainer = props => (
    <BlankContainer {...props} />
  )

  /**
   * @method renderFactory
   * @description "Фабрика" рендера компонентов в соответствии с заданной конфигурацией
   * @param {Object} payload
   * @param {Object} styles
   * @param {Object} rootStyles
   * @returns {?}
   */
  renderFactory = (payload, styles, rootStyles) => (
    payload.map((container) => {
      const settings = {
        key: container.id,
        title: container.params.title,
        params: container.params,
        route: container.route,
        child: {
          type: container.child.type,
          style: rootStyles[container.child.type],
        },
        style: styles[container.name],
      }

      switch (container.type) {
        case 'carousel': return this.renderCarouselContainer({ ...settings })
        case 'hint': return this.renderHintContainer({ ...settings })
        case 'list': return this.renderListContainer({ ...settings })
        case 'slider': return this.renderSliderContainer({ ...settings })
        default: return this.renderBlankContainer({ ...settings })
      }
    })
  )

  render() {
    return (
      <div
        style={{
          ...this.props.config.params.style.body,
          marginBottom: 68,
        }}
      >
        {this.renderFactory(
          this.props.config.containers,
          this.props.config.style,
          this.props.config.params.style,
        )}
      </div>
    )
  }
}

Constructor.propTypes = {
  config: PropTypes.shape().isRequired,
}

export default connect(
  state => ({
    config: state.data.configData,
  }),
)(Constructor)
