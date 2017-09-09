import React, { Component } from 'react'
import { connect } from 'react-redux'

import { push } from 'actions/navigationActions'
import { sendModalEventData } from 'actions/dataActions'

import { Avatar, Slider } from 'ui-components'

import style from 'components/List/style.scss'

class AvatarsList extends Component {
  componentDidMount() {
    console.warn('Component AvatarsList is deprecated.')
  }

  viewEvent = (route, item) => {
    this.props.onViewEvent(route, item)
  }

  render() {
    return (
      <div className={style.list__wrap}>
        {this.props.title
          ? <h3
            style={{
              fontSize: '1rem',
              margin: '36px 16px 8px',
              lineHeight: '1.25rem',
            }}
          >{this.props.title}</h3>
          : null
        }
        <Slider>
          {
            this.props.payload.map(item => (
              <Avatar
                key={item.id}
                src={item.photo_small}
                title={item.title}
                onClick={() => this.viewEvent('/entity/%', item)}
              />
            ))
          }
        </Slider>
      </div>
    )
  }
}

export default connect(
  state => ({}),
  dispatch => ({
    onViewEvent: (route, element) => {
      dispatch(sendModalEventData(element))
      dispatch(push(route.replace('%', element.id)))
    },
  })
)(AvatarsList)
