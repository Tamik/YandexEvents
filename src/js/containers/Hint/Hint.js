import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Spinner } from 'ui-components'

import { DataApi } from 'utils'

export default class HintContainer extends Component {
  state = {
    loading: true,
    image: '',
  }

  componentWillMount() {
    DataApi.getHint().byHoliday(1)
      .perform()
      .then(response => this.setState({
        image: response.data.data,
        loading: false,
      }))
  }

  render() {
    const heightImage = Math.floor((400 / 360) * window.innerWidth)

    return (
      <div style={this.props.style}>
        {this.state.loading
          ? (<Spinner />)
          : (
            <div
              style={{
                width: '100%',
                height: `${heightImage}px`,
              }}
              dangerouslySetInnerHTML={{ __html: this.state.image }}
            />
          )
        }
      </div>
    )
  }
}

HintContainer.defaultProps = {
  style: {},
}

HintContainer.propTypes = {
  style: PropTypes.shape(),
}
