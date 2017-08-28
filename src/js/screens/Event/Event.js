import React from 'react'
import { Link } from 'react-router-dom'
import style from './Event.scss'

const data = {
  title: 'Событие с Басковым',
  description: 'Lorem ipsum dolor sit amet...',
  image: {
    large: 'http://placehold.it/250x250',
  },
}

const Event = () => (
  <div className='transition-item screen'>
    <div className={`${style['page-inner']}`}>
      <Link to='/feed'>Back</Link>
      <br />
      <img src={data.image.large} />
      <h2>{data.title}</h2>
      <p>{data.description}</p>
    </div>
  </div>
)

export default Event
