import React, { Component } from 'react'
import ReactDom from 'react-dom'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import PageTransition from 'react-router-page-transition'

import { Main, OnBoarding, Feed, Places, Map } from 'screens'

import style from './Application.scss'

class Application extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  componentDidMount() {
    //
  }

  render() {
    return (
      <Router>
        <Route
          render={({ location }) => (
            <PageTransition>
              <Switch location={location}>
                <Route exact path='/' component={Main} />
                <Route path='/onboarding' component={OnBoarding} />
                <Route path='/feed' component={Feed} />
                <Route path='/places' component={Places} />
                <Route path='/map' component={Map} />
              </Switch>
            </PageTransition>
          )}
        />
      </Router>
    )
  }
}

const mapStateToProps = store => ({
  firstEnter: store.userStore.firstEnter,
})

export default connect(mapStateToProps)(Application)
