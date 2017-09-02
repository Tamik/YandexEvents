import React from 'react'

import style from './style.scss'

const FloatingButton = props => (
  <button className={style.button} onClick={props.onClick}>
    {props.title}
  </button>
)

export default FloatingButton
