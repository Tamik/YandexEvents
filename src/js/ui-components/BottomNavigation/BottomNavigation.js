import React from 'react'
import PropTypes from 'prop-types'

import style from './style.scss'

const BottomNavigation = props => (
  <div className={style.BottomNavigation}>
    { React.Children.toArray(props.children) }
  </div>
)

BottomNavigation.propTypes = {
  children: PropTypes.element.isRequired,
}

export default BottomNavigation
