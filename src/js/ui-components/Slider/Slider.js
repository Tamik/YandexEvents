import React from 'react'
import SliderLib from 'react-slick'
import style from './style.scss'

const Slider = (props) => {
  const settings = {
    dots: true,
    speed: 500,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  return (
    <SliderLib {...settings}>
      <div><img src='https://i.ytimg.com/vi/6KzHYkHpkeg/hqdefault.jpg' /></div>
      <div><img src='https://i.ytimg.com/vi/6KzHYkHpkeg/hqdefault.jpg' /></div>
    </SliderLib>
  )
}

export default Slider
