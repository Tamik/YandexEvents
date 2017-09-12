import React from 'react'
import PropTypes from 'prop-types'

import { IconsList } from './'

const Icon = (props) => {
  switch (props.type) {
    case 'arrowBack':
      return <svg viewBox='0 0 24 24' width={props.width} height={props.height} fill={props.color} dangerouslySetInnerHTML={{ __html: IconsList.arrowBack }} />
    case 'arrowUp':
      return <svg viewBox='0 0 12 8' width={props.width} height={props.height} fill={props.color} dangerouslySetInnerHTML={{ __html: IconsList.arrowUp }} />
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
    case 'starActive':
      return <svg viewBox='0 0 22 21' width={props.width} height={props.height} fill={props.color} dangerouslySetInnerHTML={{ __html: IconsList.starActive }} />
    case 'profile':
      return <svg viewBox='0 0 22 20' width={props.width} height={props.height} fill={props.color} dangerouslySetInnerHTML={{ __html: IconsList.profile }} />
    case 'search':
      return <svg viewBox='0 0 18 18' width={props.width} height={props.height} fill={props.color} dangerouslySetInnerHTML={{ __html: IconsList.search }} />
    case 'ticket':
      return <svg viewBox='0 0 16 20' width={props.width} height={props.height} fill={props.color} dangerouslySetInnerHTML={{ __html: IconsList.ticket }} />
    case 'moscowDay':
      return <svg viewBox='0 0 22 22' width={props.width} height={props.height} fill={props.color} dangerouslySetInnerHTML={{ __html: IconsList.moscowDay }} />
    case 'moscowDayActive':
      return <svg viewBox='0 0 20 20' width={props.width} height={props.height} fill={props.color} dangerouslySetInnerHTML={{ __html: IconsList.moscowDayActive }} />
    case 'mylocation':
      return <svg viewBox='0 0 24 24' width={props.width} height={props.height} fill={props.color} dangerouslySetInnerHTML={{ __html: IconsList.mylocation }} />
    case 'zoomIn':
      return <svg viewBox='0 0 24 24' width={props.width} height={props.height} fill={props.color} dangerouslySetInnerHTML={{ __html: IconsList.zoomIn }} />
    case 'zoomOut':
      return <svg viewBox='0 0 24 24' width={props.width} height={props.height} fill={props.color} dangerouslySetInnerHTML={{ __html: IconsList.zoomOut }} />
    default:
      return ''
  }
}

Icon.defaultProps = {
  width: '24',
  height: '24',
  color: '#000',
}

Icon.propTypes = {
  type: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  color: PropTypes.string,
}
export default Icon
