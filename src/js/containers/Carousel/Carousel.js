import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ClassNames from 'classnames'

import { push } from 'actions/navigationActions'
import {
  sendModalEventData,
  sendModalPlaceData,
  sendModalEntityData,
} from 'actions/dataActions'
import { fetchContainerData } from 'actions/constructorActions'

import { Avatar, Card, Carousel, Spinner } from 'ui-components'

import style from 'components/List/style.scss'

/**
 * @class CarouselContainer
 * @description Компонент-контейнер для конструктора ленты
 */
class CarouselContainer extends Component {
  /**
   * @static propTypes
   */
  static propTypes = {
    onRequestData: PropTypes.func.isRequired,
    onViewModal: PropTypes.func.isRequired,
    title: PropTypes.string,
    style: PropTypes.shape(),
    params: PropTypes.shape().isRequired,
    loaded: PropTypes.bool,
  }

  /**
   * @static defaultProps
   * @description Значения props по-умолчанию
   */
  static defaultProps = {
    title: null,
    style: {},
    loaded: false,
  }

  componentWillMount() {
    this.getData(this.props)
  }

  /**
   * @method getData
   * @description Вызов экшена запроса данных для контейнера
   * @param {Object} props
   */
  getData = props => this.props.onRequestData(props, this.props.params.key)

  /**
   * @method openModal
   * @description Вызов экшена для открытия модального окна
   * @param {Object} route
   * @param {Object} element
   */
  openModal = (route, element) => {
    this.props.onViewModal(route, element)
  }

  /**
   * @method renderAvatar
   * @description Рендер компонента Avatar
   * @param {Object} props
   * @return {Component}
   */
  renderAvatar = props => (
    <Avatar {...props} />
  )

  /**
   * @method renderCard
   * @description Рендер компонента Card
   * @param {Object} props
   * @return {Component}
   */
  renderCard = props => (
    <Card {...props} />
  )

  /**
   * @method renderFactory
   * @description "Фабрика" рендера компонентов в соответствии с заданной конфигурацией
   * @param {Array} payload
   */
  renderFactory = payload => (
    payload.map((element) => {
      switch (this.props.child.type) {
        case 'avatar': return this.renderAvatar({
          key: element.id,
          src: element.photo_small,
          title: element.title,
          onClick: () => this.openModal(this.props.route, element),
        })
        default: return this.renderCard({
          key: element.id,
          size: this.props.child.params.size,
          title: element.title,
          src: element.photo_small,
          location: element.location_title,
          date: `${element.dateFormatted.day} ${element.dateFormatted.month} ${element.dateFormatted.time}`,
          style: {
            ...element.style,
          },
          onClick: () => this.openModal(this.props.route, element),
        })
      }
    })
  )

  render() {
    return (
      <div style={this.props.style} className={ClassNames(style.carousel_animate)}>
        {this.props.constructor[this.props.params.key]
          && this.props.constructor[this.props.params.key].length > 0
          ? (
            <div className={ClassNames(style.list__wrap)}>
              {this.props.title
                ? (
                  <h3
                    style={{
                      fontSize: '1rem',
                      margin: '40px 16px 10px',
                      lineHeight: '1.25rem',
                    }}
                  >{this.props.title}</h3>
                )
                : null
              }
              <Carousel>
                <div>
                  {this.renderFactory(this.props.constructor[this.props.params.key])}
                </div>
              </Carousel>
            </div>
          )
          : (
            <Spinner />
          )
        }
      </div>
    )
  }
}

export default connect(
  state => ({
    constructor: state.constructor,
  }),
  dispatch => ({
    onViewModal: (route, element) => {
      if (/event/.test(route)) {
        dispatch(sendModalEventData(element))
      }
      if (/place/.test(route)) {
        dispatch(sendModalPlaceData(element))
      }
      if (/entity/.test(route)) {
        dispatch(sendModalEntityData(element))
      }

      dispatch(push(route.replace('%', element.id)))
    },
    onRequestData: (payload, key) => {
      dispatch(fetchContainerData(payload.params, key))
    },
  })
)(CarouselContainer)
