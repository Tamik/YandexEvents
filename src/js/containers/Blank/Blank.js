/* dev:start */
import React, { Component } from 'react'
import axios from 'axios'

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
/* dev:end */
