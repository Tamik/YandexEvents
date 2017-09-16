/* dev:start */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { fetchContainerData } from 'actions/constructorActions'

/**
 * @class BlankContainer
 * @description Компонент-контейнер для конструктора ленты
 * 
 * @deprecated Данный компонент не разработан
 */
class BlankContainer extends Component {
  /**
   * @static propTypes
   */
  static propTypes = {
    onRequestData: PropTypes.func.isRequired,
    params: PropTypes.shape().isRequired,
  }

  /**
   * @static defaultProps
   * @description Значения props по-умолчанию
   */
  static defaultProps = {}

  componentWillMount() {
    console.warn('Component Blank is depreacated')
    this.getData(this.props)
  }

  /**
   * @method getData
   * @description Вызов экшена запроса данных для контейнера
   * @param {Object} props
   */
  getData = props => this.props.onRequestData(props, this.props.params.key)

  render() {
    return (
      <div>This component is deprecated.</div>
    )
  }
}

export default connect(
  state => ({
    constructor: state.constructor,
  }),
  dispatch => ({
    onRequestData: (payload, key) => {
      dispatch(fetchContainerData(payload.params, key))
    },
  })
)(BlankContainer)
/* dev:end */
