import React from 'react'
import { Link } from 'react-router-dom'

const Places = () => (
  <div className='transition-item'>
    <h1>This is Places Component</h1>
    <Link to='/feed'>Feed</Link>
    <br />
    <Link to='/map'>Map</Link>
  </div>
)

export default Places
