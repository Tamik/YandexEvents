import React from 'react'
import PropTypes from 'prop-types'

import { IconsList } from './'

const Icon = (props) => {
  switch (props.type) {
    case 'arrowBack':
      return <svg viewBox='0 0 24 24' width={props.width} height={props.height} color={props.color} dangerouslySetInnerHTML={{ __html: IconsList.arrowBack }} />
    case 'map':
      return <svg viewBox='0 0 24 24' width={props.width} height={props.height} color={props.color} dangerouslySetInnerHTML={{ __html: IconsList.map }} />
    case 'list':
      return <svg viewBox='0 0 24 24' width={props.width} height={props.height} color={props.color} dangerouslySetInnerHTML={{ __html: IconsList.list }} />
    default:
      return <p>Нет такой иконки</p>
  }
}

Icon.propTypes = {
  type: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
}
export default Icon
