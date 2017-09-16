import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { fetchContainerData } from 'actions/constructorActions'

import { Spinner } from 'ui-components'

/**
 * @class HintContainer
 * @description Компонент-контейнер для конструктора ленты
 */
class HintContainer extends Component {
  /**
   * @static propTypes
   */
  static propTypes = {
    onRequestData: PropTypes.func.isRequired,
    params: PropTypes.shape().isRequired,
    style: PropTypes.shape(),
  }

  /**
   * @static defaultProps
   * @description Значения props по-умолчанию
   */
  static defaultProps = {
    style: {},
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

  render() {
    const heightImage = Math.floor((400 / 360) * window.innerWidth)

    return (
      <div style={this.props.style}>
        {this.props.constructor[this.props.params.key]
          ? (
            <div
              style={{
                width: '100%',
                height: heightImage,
              }}
              dangerouslySetInnerHTML={{ __html: this.props.constructor[this.props.params.key] }}
            />
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
    onRequestData: (payload, key) => {
      dispatch(fetchContainerData(payload.params, key))
    },
  })
)(HintContainer)
