import React from 'react'

const StaticMap = props => (
  <div
    style={{
      backgroundImage: `url(https://static-maps.yandex.ru/1.x/?ll=${props.coords[0]},${props.coords[1]}&size=${props.width},${props.height}&z=${props.zoom}&l=map&pt=${props.coords[0]},${props.coords[1]},pm2rdl)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      width: '100%',
      minHeight: 172,
    }}
  />
)

export default StaticMap
