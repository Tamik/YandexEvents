import React from 'react'
import PropTypes from 'prop-types'
import SliderLib from 'react-slick'

import './style.scss'

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

Slider.defaultProps = {
  dots: false,
}

Slider.propTypes = {
  dots: PropTypes.bool,
  children: PropTypes.element.isRequired,
}

export default Slider
