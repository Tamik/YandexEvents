import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { goBack } from 'actions/navigationActions'

import { BottomNav } from 'components'

import { TopBar, Image, Icon, Container, Spinner } from 'ui-components'

import { DataApi } from 'utils/DataApi'

import styleCard from 'ui-components/Card/style.scss'
import style from './style.scss'

class Event extends Component {
  state = {
    event: {},
    loading: true,
  }

  componentWillMount() {
    DataApi.getEvent()
      .byHoliday(1)
      .byId(this.props.params.eventId)
      .perform()
      .then(response => this.setState({
        event: response.data.data,
        loading: false,
      }))
  }

  goBack = () => {
    this.props.goBack()
  }

  render() {
    const event = this.state.event

    return (
      <div>
        {this.state.loading
          ? (<Spinner />)
          : (
            <div className='screen'>
              <TopBar
                isTransparent
                icon={
                  <button onClick={this.goBack}>
                    <Icon type='arrowBack' width='24' height='24' color='#fff' />
                  </button>
                }
              />
              <Container stretching scrolling>
                <Image
                  size='large'
                  src={`http://io.yamblz.ru/i/events/${event.id}_large.jpg`}
                />
                <div className={`${styleCard.card__info} ${style.card__info_large}`}>
                  <h2 className={`${styleCard.card__title} ${styleCard.card__title_large}`}>
                    {event.title}
                  </h2>
                  <div
                    style={{
                      marginBottom: 16,
                      fontSize: '1.25rem',
                      lineHeight: '1.75rem',
                      color: '#000',
                    }}
                  >
                    <p>
                      {event.dateFormatted.day} - {event.dateEndFormatted.day}, {event.dateEndFormatted.month}
                    </p>
                    <p>
                      {event.dateFormatted.time} - {event.dateEndFormatted.time}
                    </p>
                  </div>
                  <p
                    style={{
                      fontSize: '1rem',
                      lineHeight: '1.375rem',
                      color: '#000',
                    }}
                    dangerouslySetInnerHTML={{ __html: event.description }}
                  />
                </div>
              </Container>
              <BottomNav />
            </div>
          )
        }
      </div>
    )
  }
}

Event.propTypes = {
  params: PropTypes.object.isRequired,
  goBack: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    eventData: state.data.eventData,
  }),
  dispatch => ({
    goBack: () => {
      dispatch(goBack())
    },
  })
)(Event)
