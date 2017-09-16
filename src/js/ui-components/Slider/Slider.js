import React from 'react'
import PropTypes from 'prop-types'
import SliderLib from 'react-slick'

import './style.scss'

const Slider = (props) => {
  const settings = {
    dots: props.dots,
    infinite: props.infinite,
    speed: 400,
    arrows: false,
    slidesToShow: 1,
    variableWidth: true,
    swipe: true,
  }

  return (
    <SliderLib {...settings}>
      {React.Children.toArray(props.children)}
    </SliderLib>
  )
}

Slider.defaultProps = {
  dots: false,
  infinite: true,
}

Slider.propTypes = {
  dots: PropTypes.bool,
  infinite: PropTypes.bool,
  children: PropTypes.element.isRequired,
}

export default Slider
