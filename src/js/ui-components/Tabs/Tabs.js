import React from 'react'

import style from './style.scss'

const Tabs = props => (
  <div className={style.tabs}>
    { React.Children.toArray(props.children) }
  </div>
)

export default Tabs
