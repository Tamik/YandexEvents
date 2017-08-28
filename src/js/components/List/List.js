import React from 'react'
import PropTypes from 'prop-types'
import style from './style.scss'

const List = props => (
  <div className={style.list}>
    {props.items.map(item => (<div>{item}</div>))}
  </div>
)

List.defaultProps = {
  items: ['Выставка', 'Выставка', 'Концерт'],
  type: 'events',
}

List.propTypes = {
  items: PropTypes.array,
  type: PropTypes.string,
}

export default List
