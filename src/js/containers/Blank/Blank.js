/* dev:start */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import axios from 'axios'

export default class BlankContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  componentWillMount() {
    // axios.get()
    console.warn('Component BlankContainer could not to use.')
  }

  render() {
    return (
      <div>
        {this.props.item}
      </div>
    )
  }
}

BlankContainer.defaultProps = {
  item: {},
}

BlankContainer.propTypes = {
  item: PropTypes.shape().isRequired,
}
/* dev:end */
