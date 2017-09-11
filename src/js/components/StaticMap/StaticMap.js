import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import style from './styles.scss'

const StaticMap = props => (
  <div
    className={cn(style.staticMap)}
    style={{
      ...props.style,
      backgroundImage: `url(https://static-maps.yandex.ru/1.x/?ll=${props.coords[0]},${props.coords[1]}&size=${parseInt(props.width * 1.25, 10)},${parseInt(props.height * 1.25, 10)}&z=${props.zoom}&l=map&pt=${props.coords[0]},${props.coords[1]},pm2rdl)`,
      maxWidth: props.width,
      height: props.height,
    }}
  />
)

StaticMap.defaultProps = {
  zoom: 13,
  width: 300,
  height: 300,
  style: null,
}

StaticMap.propTypes = {
  coords: PropTypes.shape().isRequired,
  zoom: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.height,
  style: PropTypes.shape(),
}

export default StaticMap
