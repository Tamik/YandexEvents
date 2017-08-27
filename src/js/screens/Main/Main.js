import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const mapStateToProps = store => ({
  firstEnter: store.userStore.firstEnter,
})

const Main = props => (
  <div className='transition-item'>
    {props.firstEnter
      ? (<Redirect to='/onboarding' />)
      : (<Redirect to='/feed' />)
    }
  </div>
)

Main.propTypes = {
  firstEnter: PropTypes.bool.isRequired,
}

export default connect(mapStateToProps)(Main)
