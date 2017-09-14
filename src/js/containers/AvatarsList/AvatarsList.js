import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { push } from 'actions/navigationActions'
import { sendModalEventData, sendModalPlaceData, sendModalEntityData } from 'actions/dataActions'

import { Avatar, Carousel } from 'ui-components'

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
      </div>
    )
  }
}

AvatarsList.defaultProps = {
  title: null,
}

AvatarsList.propTypes = {
  onViewEvent: PropTypes.func.isRequired,
  title: PropTypes.string,
  payload: PropTypes.shape().isRequired,
}

export default connect(
  state => ({}),
  dispatch => ({
    onViewEvent: (route, element) => {
      if (/event/.test(route)) {
        dispatch(sendModalEventData(element))
      }
      if (/place/.test(route)) {
        dispatch(sendModalPlaceData(element))
      }
      if (/entity/.test(route)) {
        dispatch(sendModalEntityData(element))
      }
      dispatch(push(route.replace('%', element.id)))
    },
  })
)(AvatarsList)
