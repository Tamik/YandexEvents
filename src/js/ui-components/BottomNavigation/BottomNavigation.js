import React from 'react'
import PropTypes from 'prop-types'
import ClassNames from 'classnames'

import style from './style.scss'

const BottomNavigation = props => (
  <div className={ClassNames(style.BottomNavigation)}>
    {React.Children.toArray(props.children)}
  </div>
)

BottomNavigation.propTypes = {
  children: PropTypes.element.isRequired,
}

export default BottomNavigation
