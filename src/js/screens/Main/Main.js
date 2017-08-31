import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { OnBoarding, Feed } from 'screens'

const Main = (props) => {
  console.log('Main.firstEnter: ', props)
  return (
    <div>
      {props.state.user.firstEnter
        ? (<OnBoarding />)
        : (<Feed />)
      }
    </div>
  )
}

export default connect(
  state => ({ 
    state,
  }),
  dispatch => ({
    
  })
)(Main)
