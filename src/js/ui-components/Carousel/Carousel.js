import React from 'react'
import style from './Carousel.scss'

const Carousel = props => (
  <div className={style.carousel}>
    { React.Children.only(props.children) }
  </div>
)

export default Carousel
