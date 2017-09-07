import React from 'react'
import PropTypes from 'prop-types'

import { IconsList } from './'

const Icon = (props) => {
  switch (props.type) {
    case 'arrowBack':
      return <svg viewBox='0 0 24 24' width={props.width} height={props.height} fill={props.color} dangerouslySetInnerHTML={{ __html: IconsList.arrowBack }} />
    case 'map':
      return <svg viewBox='0 0 24 24' width={props.width} height={props.height} fill={props.color} dangerouslySetInnerHTML={{ __html: IconsList.map }} />
    case 'list':
      return <svg viewBox='0 0 24 24' width={props.width} height={props.height} fill={props.color} dangerouslySetInnerHTML={{ __html: IconsList.list }} />
    case 'event':
      return <svg viewBox='0 0 24 24' width={props.width} height={props.height} fill={props.color} dangerouslySetInnerHTML={{ __html: IconsList.event }} />
    case 'eventFill':
      return <svg viewBox='0 0 24 24' width={props.width} height={props.height} fill={props.color} dangerouslySetInnerHTML={{ __html: IconsList.eventFill }} />
    case 'star':
      return <svg viewBox='0 0 24 24' width={props.width} height={props.height} fill={props.color} dangerouslySetInnerHTML={{ __html: IconsList.star }} />
    case 'starFill':
      return <svg viewBox='0 0 24 24' width={props.width} height={props.height} fill={props.color} dangerouslySetInnerHTML={{ __html: IconsList.starFill }} />
    case 'bookmark':
      return <svg viewBox='0 0 24 24' width={props.width} height={props.height} fill={props.color} dangerouslySetInnerHTML={{ __html: IconsList.bookmark }} />
    case 'bookmarkFill':
      return <svg viewBox='0 0 24 24' width={props.width} height={props.height} fill={props.color} dangerouslySetInnerHTML={{ __html: IconsList.bookmarkFill }} />
    default:
      return ''
  }
}

Icon.propTypes = {
  type: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  color: PropTypes.string,
}
export default Icon
