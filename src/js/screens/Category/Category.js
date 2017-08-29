import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import style from './style.scss'

const Category = ({ match }) => (
  <div className='transition-item screen'>
    <div className={`${style['page-inner']}`}>
      <Link to='/feed'>Back</Link>
      <p>Category Title: Подумать, как передавать</p>
      {/* Возможно будет справочник категорий в store.categories 
        а также текущая категория и ее мета-данные были бы доступны 
        в store.category = { id, title, count, etc }
      */}
      <br />
      <p>CategoryID: {match.params.id}</p>
      {/*
        - load events by category
        - render
      */}
      <div>
        event 1<br />
        event 2<br />
        event 3
      </div>
    </div>
  </div>
)

const mapStateToProps = store => ({
})

export default connect(mapStateToProps)(Category)
