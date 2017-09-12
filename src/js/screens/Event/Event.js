import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { goBack } from 'actions/navigationActions'

import { clearModalEventData } from 'actions/dataActions'
import { addToFavorites, delFromFavorites } from 'actions/userActions'

import { BottomNav, StaticMap } from 'components'

import { TopBar, Image, Icon, Container, Spinner } from 'ui-components'

import { DataApi, Daty } from 'utils'

import styleCard from 'ui-components/Card/style.scss'
import style from './style.scss'

class Event extends Component {
  state = {
    event: {},
    loading: true,
    hideText: true,
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

  isInFavorites = () => !!this.props.favorites[this.props.params.eventId]

  addToFavorites = () => {
    if (this.isInFavorites()) {
      this.props.delFromFavorites(this.state.event)
    }
    else {
      this.props.addToFavorites(this.state.event)
    }
  }

  toggleDescription = () => {
    if (this.state.hideText) {
      this.setState({
        hideText: false,
      })
    }
    else {
      this.setState({
        hideText: true,
      })
    }
  }

  render() {
    const event = this.state.event
    const formattedDate = Daty.beautifyDatesRange(
      event.begin_time,
      event.end_time
    )
    const description = event.description
      ? {
        start: event.description.slice(0, 150).concat('...'),
        full: event.description,
      }
      : null
    return (
      <div>
        {this.state.loading
          ? (<Spinner />)
          : (
            <div className='screen'>
              <TopBar
                isTransparent
                onClick={{
                  back: this.goBack,
                  favorites: this.addToFavorites,
                }}
                iconLeft={
                  <Icon type='arrowBack' width='24' height='24' color='#fff' />
                }
                iconRight={
                  <Icon type={this.isInFavorites() ? 'bookmarkFill' : 'bookmark'} width='24' height='24' color='#fff' />
                }
              />
              <Container stretching scrolling>
                <Image
                  size='large'
                  src={event.photo_large}
                />
                <div className={`${styleCard.card__info} ${style.card__info_large}`}>
                  <h2 className={`${styleCard.card__title} ${styleCard.card__title_large}`}>
                    {event.title}
                  </h2>
                  <div
                    style={{
                      fontSize: '1.25rem',
                      marginBottom: 16,
                      color: '#000',
                      lineHeight: '1.75rem',
                    }}
                  >
                    <p>
                      {formattedDate.dates}
                    </p>
                    <p>
                      {formattedDate.time}
                    </p>
                  </div>
                  <p
                    style={{
                      fontSize: '1rem',
                      color: '#000',
                      lineHeight: '1.375rem',
                    }}
                    dangerouslySetInnerHTML={
                      this.state.hideText
                        ? { __html: description.start }
                        : { __html: description.full }
                    }
                  />
                  <button
                    className={style.button}
                    onClick={this.toggleDescription}
                  >
                    {
                      this.state.hideText
                        ? 'Полное описание'
                        : 'Скрыть описание'
                    }
                  </button>
                  <div style={{ margin: '16px 0' }}>
                    <hr style={{ backgroundColor: '#e5e5e5', border: 'none', height: 1 }} />
                    <div style={{ margin: '12px 0 16px' }}>
                      <h3
                        style={{
                          display: 'inline-block',
                          fontSize: 16,
                          color: '#000',
                          verticalAlign: 'middle',
                        }}
                      >{event.location_title}</h3>
                    </div>
                    <StaticMap
                      coords={[event.lng, event.lat]}
                      zoom={15}
                      width={342}
                      height={172}
                    />
                    <p
                      style={{
                        fontSize: '0.875rem',
                        marginTop: 8,
                        color: '#000',
                        lineHeight: '1.25rem',
                      }}
                    >{event.address}</p>
                  </div>
                </div>
              </Container>
            </div>
          )
        }
      </div>
    )
  }
}

Event.propTypes = {
  params: PropTypes.shape().isRequired,
  goBack: PropTypes.func.isRequired,
  addToFavorites: PropTypes.func.isRequired,
  delFromFavorites: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    eventData: state.data.eventData,
    favorites: state.user.favorites,
  }),
  dispatch => ({
    goBack: () => {
      dispatch(goBack())
      dispatch(clearModalEventData())
    },
    addToFavorites: (event) => {
      dispatch(addToFavorites(event))
    },
    delFromFavorites: (event) => {
      dispatch(delFromFavorites(event))
    },
  })
)(Event)
