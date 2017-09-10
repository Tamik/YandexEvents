import React from 'react'

import style from './style.scss'

const BottomNavigation = props => (
  <div className={style.botNav}>
    { React.Children.toArray(props.children) }
  </div>
)

BottomNavigation.propTypes = {
  children: PropTypes.element.isRequired,
}

export default BottomNavigation
