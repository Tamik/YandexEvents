import React from 'react'

import style from './style.scss'

const TopBar = props => (
  <div className={style.topBar}>
    { React.Children.toArray(props.children) }
  </div>
)

export default TopBar
