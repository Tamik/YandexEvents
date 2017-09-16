import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { push } from 'actions/navigationActions'
import {
  sendModalEventData,
  sendModalPlaceData,
  sendModalEntityData,
} from 'actions/dataActions'
import { fetchContainerData } from 'actions/constructorActions'

import { Avatar, Card, Spinner } from 'ui-components'

/**
 * @class ListContainer
 * @description Компонент-контейнер для конструктора ленты
 */
class ListContainer extends Component {
  /**
   * @static propTypes
   */
  static propTypes = {
    onRequestData: PropTypes.func.isRequired,
    onViewModal: PropTypes.func.isRequired,
    title: PropTypes.string,
    params: PropTypes.shape().isRequired,
    route: PropTypes.string,
    style: PropTypes.shape(),
    categoryId: PropTypes.string,
    filterByDate: PropTypes.string,
    loaded: PropTypes.bool,
  }

  /**
   * @static defaultProps
   * @description Значения props по-умолчанию
   */
  static defaultProps = {
    title: null,
    route: '',
    style: {},
    categoryId: null,
    filterByDate: null,
    loaded: false,
  }

  componentWillMount() {
    this.getData(this.props)
  }

  componentWillReceiveProps(nextProps) {
    const isCategoryEqual = this.props.categoryId === nextProps.categoryId
    const isFilterByDateEqual = this.props.filterByDate === nextProps.filterByDate

    if (!isCategoryEqual || !isFilterByDateEqual) {
      this.getData(nextProps)
    }
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
    this.props.onViewModal(this.props.route, element)
  }

  /**
   * @method renderAvatar
   * @description Рендер компонента Avatar
   * @param {Object} props
   * @returns {Component}
   */
  renderAvatar = props => (
    <Avatar {...props} />
  )

  /**
   * @method renderCard
   * @description Рендер компонента Card
   * @param {Object} props
   * @returns {Component}
   */
  renderCard = props => (
    <Card {...props} />
  )

  /**
   * @method renderFactory
   * @description "Фабрика" рендера компонентов в сответствии с заданным типом
   * @param {Object} payload
   */
  renderFactory = payload => (
    payload.map((element, index) => {
      switch (this.props.child.type) {
        case 'avatar': return this.renderAvatar({
          key: element.id,
          src: element.photo_small,
          title: element.title,
          style: {
            ...element.style,
          },
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
            marginBottom: 20,
            animationDelay: `${index * 200}ms`,
          },
          onClick: () => this.openModal(this.props.route, element),
        })
      }
    })
  )

  render() {
    return (
      <div
        style={{
          ...this.props.style,
          margin: 16,
          marginBottom: this.props.categoryId ? 16 * 4 : 64,
        }}
      >
        {this.props.constructor[this.props.params.key]
          && this.props.constructor[this.props.params.key].length > 0
          ? (
            <div>
              {this.props.title
                ? <h3
                  style={{
                    fontSize: '1rem',
                    margin: '36px 0 10px',
                    lineHeight: '1.25rem',
                  }}
                >{this.props.title}</h3>
                : null
              }
              {this.renderFactory(this.props.constructor[this.props.params.key])}
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
)(ListContainer)
