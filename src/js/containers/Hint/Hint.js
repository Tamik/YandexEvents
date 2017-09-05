import React, { Component } from 'react'
import axios from 'axios'

export default class HintContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: null,
      description: null,
    }
  }

  componentWillMount() {
    axios.get('http://io.yamblz.ru/events', {
      params: {
        items_per_page: 1,
      },
    })
      .then(response => this.setState({
        title: response.data.data[0].title,
        description: response.data.data[0].location_title,
      }))
  }

  render() {
    return (
      <div style={this.props.style}>
        <h3>{this.state.title}</h3>
        <span>{this.state.description}</span>
      </div>
    )
  }
}
