import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'

import { Welcome, Feed, Places, Map } from 'components/screens'

export default class Application extends Component {
  state = {
    firstEnter: true,
  }

  render() {
    return (
      <div>
        <Route exact path='/' render={() => (
          this.state.firstEnter
          ? (<Welcome />)
          : (<Redirect to='/feed' />)
        )} />
        <Route path='/welcome' component={Welcome} />
        <Route path='/feed' component={Feed} />
        <Route path='/places' component={Places} />
        <Route path='/map' component={Map} />
      </div>
    )
  }
}
