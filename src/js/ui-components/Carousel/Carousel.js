import React from 'react'
import style from './Carousel.scss'

const { children } = this.props

const Carousel = props => (
  <div className={style.carousel}>
    <div className={style.inner}>
      { children ? React.Children.only(children) : null }
    </div>
  </div>
)

export default Carousel
