import React from 'react'
import { Link } from 'react-router-dom'

import { Container, TopBar } from 'ui-components'

const Places = () => (
  <div className='screen transition-item'>
    <TopBar>
      <h1>This is Places Component</h1>
      <Link to='/feed'>Feed</Link>
      <br />
      <Link to='/map'>Map</Link>
    </TopBar>
    <Container stretching scrolling>
      <p>Тут будет список мест</p>
    </Container>
  </div>
)

export default Places
