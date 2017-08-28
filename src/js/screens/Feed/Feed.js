import React from 'react'
import { Link } from 'react-router-dom'
import style from './Feed.scss'

const Feed = () => (
  <div className='transition-item Feed'>
    <h1>This is Feed Component</h1>
    <Link to='/onboarding' style={{ color: 'white' }}>Back</Link>
    <br />
    <Link to='/places'>Places</Link>
    <br />
    <Link to='/map'>Map</Link>
  </div>
)

export default Feed
