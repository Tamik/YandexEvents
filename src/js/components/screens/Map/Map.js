import React from 'react'
import { Link } from 'react-router-dom'

const Map = () => (
  <div className='transition-item'>
    <h1>This is Map Component</h1>
    <Link to='/feed'>Feed</Link>
    <br />
    <Link to='/places'>Places</Link>
  </div>
)

export default Map
