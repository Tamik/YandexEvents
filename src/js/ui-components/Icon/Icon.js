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
    case 'star':
      return <svg viewBox='0 0 22 21' width={props.width} height={props.height} color={props.color} dangerouslySetInnerHTML={{ __html: IconsList.star }} />
    case 'starActive':
      return <svg viewBox='0 0 22 21' width={props.width} height={props.height} color={props.color} dangerouslySetInnerHTML={{ __html: IconsList.starActive }} />
    case 'profile':
      return <svg viewBox='0 0 22 20' width={props.width} height={props.height} color={props.color} dangerouslySetInnerHTML={{ __html: IconsList.profile }} />
    case 'search':
      return <svg viewBox='0 0 18 18' width={props.width} height={props.height} color={props.color} dangerouslySetInnerHTML={{ __html: IconsList.search }} />
    case 'ticket':
      return <svg viewBox='0 0 16 20' width={props.width} height={props.height} color={props.color} dangerouslySetInnerHTML={{ __html: IconsList.ticket }} />
    case 'moscowDay':
      return <svg viewBox='0 0 22 22' width={props.width} height={props.height} color={props.color} dangerouslySetInnerHTML={{ __html: IconsList.moscowDay }} />
    case 'moscowDayActive':
      return <svg viewBox='0 0 20 20' width={props.width} height={props.height} color={props.color} dangerouslySetInnerHTML={{ __html: IconsList.moscowDayActive }} />
    default:
      return <p>Нет такой иконки</p>
  }
}

Icon.propTypes = {
  type: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  color: PropTypes.string,
}
export default Icon
