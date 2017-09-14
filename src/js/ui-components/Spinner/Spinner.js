import React from 'react'
import ClassNames from 'classnames'

import style from './style.scss'

const Spinner = () => (
  <div className={ClassNames(style.spinner)}>
    <div className={ClassNames(style.spinner__wrap)} />
  </div>
)

export default Spinner
