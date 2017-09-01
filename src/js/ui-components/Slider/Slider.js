import React from 'react'
import SliderLib from 'react-slick'
import style from './style.scss'

const Slider = (props) => {
  const settings = {
    dots: props.dots,
    infinite: true,
    speed: 400,
    arrows: false,
    slidesToShow: 1,
    variableWidth: true,
    swipe: true,
  }

  return (
    <SliderLib {...settings}>
      { React.Children.toArray(props.children) }
    </SliderLib>
  )
}

export default Slider
