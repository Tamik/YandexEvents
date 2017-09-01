import React from 'react'
import { Link } from 'react-router-dom'

import { Container, TopBar } from 'ui-components'

const Places = () => (
  <div className='screen transition-item'>
    <TopBar>
      <h1>This is Place Component</h1>
    </TopBar>
    <Container stretching scrolling>
      <p>Тут будет список событий по месту</p>
    </Container>
  </div>
)

export default Places
