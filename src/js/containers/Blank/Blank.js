/* dev:start */
import React, { Component } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'

export default class BlankContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  componentWillMount() {
    axios.get()
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
