import React from 'react'
import { Link } from 'react-router-dom'
import style from './Feed.scss'

const Feed = () => (
  <div className='transition-item screen'>
    <div className={style['page-inner']}>
      <div className={style['tabs']}>
        <div className={`${style['tabs__tab']} ${style['tabs__tab_active']}`}>Лента</div>
        <div className={style['tabs__tab']}>Карта</div>
      </div>

      <div className={style['events-list']}>
        events list here
        <Link to='/event'>Открыть Screen Event</Link>
      </div>
    </div>
    <Link to='/onboarding' style={{ color: '#999', position: 'absolute', bottom: 0 }}>&lt; Goto Screen OnBoarding</Link>
  </div>
)
export default Feed
