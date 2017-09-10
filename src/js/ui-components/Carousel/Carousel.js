import React from 'react'
import PropTypes from 'prop-types'

import style from './style.scss'

const Carousel = props => (
  <div className={style.carousel}>
    { React.Children.only(props.children) }
  </div>
)

Carousel.propTypes = {
  children: PropTypes.element.isRequired,
}

export default Carousel
