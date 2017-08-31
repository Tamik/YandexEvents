import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { Container, TopBar } from 'ui-components'
import style from './style.scss'

const Event = props => (
  <div className='transition-item screen'>
    <TopBar>
      <Link to='/feed'>Back</Link>
    </TopBar>
    <Container scrolling stretching>
      <img src={props.event.image.small.src} />
      <h2>{props.event.title}</h2>
      {/* <p>{props.event.description}</p> */}
    </Container>
  </div>
)

const mapStateToProps = store => ({
  event: store.eventStore.event,
})

export default connect(mapStateToProps)(Event)
