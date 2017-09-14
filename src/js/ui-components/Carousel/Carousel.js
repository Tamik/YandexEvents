import React from 'react'
import PropTypes from 'prop-types'
import ClassNames from 'classnames'

import style from './style.scss'

const Carousel = props => (
  <div className={ClassNames(style.carousel)}>
    { React.Children.only(props.children) }
  </div>
)

Carousel.propTypes = {
  children: PropTypes.element.isRequired,
}

export default Carousel
