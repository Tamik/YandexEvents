import React from 'react'
import PropTypes from 'prop-types'
import ClassNames from 'classnames'

import style from './style.scss'

const Tabs = props => (
  <div className={ClassNames(style.tabs)} style={props.style}>
    {React.Children.toArray(props.children)}
  </div>
)

Tabs.defaultProps = {
  style: {},
}

Tabs.propTypes = {
  style: PropTypes.shape(),
  children: PropTypes.element.isRequired,
}

export default Tabs
