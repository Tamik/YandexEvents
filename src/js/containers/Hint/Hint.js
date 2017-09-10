import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

import { Spinner } from 'ui-components'

export default class HintContainer extends Component {
  state = {
    title: null,
    subtitle: null,
    loading: true,
  }

  componentWillMount() {
    axios.get('http://io.yamblz.ru/events', {
      params: {
        items_per_page: 1,
      },
    })
      .then(response => this.setState({
        title: response.data.data[0].title,
        subtitle: response.data.data[0].location_title,
        loading: false,
      }))
  }

  render() {
    return (
      <div style={this.props.style}>
        {this.state.loading
          ? (<Spinner />)
          : (
            <div>
              <h3>{this.state.title}</h3>
              <span>{this.state.subtitle}</span>
            </div>
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
