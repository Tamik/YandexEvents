import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import style from './style.scss'

const Category = props => (
  <div className='transition-item screen'>
    <div className={`${style['page-inner']}`}>
      <Link to='/feed'>Back</Link>
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
