import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push, goBack } from 'actions/navigationActions'
import { addToFavs, delFromFavs } from 'actions/userActions'

import { BottomNav, StaticMap } from 'components'

import { TopBar, Image, Icon, Container, Spinner } from 'ui-components'

import { DataApi } from 'utils/DataApi'
import { Daty } from 'utils'

import style from './style.scss'
import styleCard from 'ui-components/Card/style.scss'

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

  isInFavs = () => {
    return !!this.props.favs[this.props.params.eventId]
  }

  addToFavs = () => {
    this.isInFavs()
      ? this.props.delFromFavs(this.state.event)
      : this.props.addToFavs(this.state.event)
  }

  render() {
    const event = this.state.event
    const formattedDate = Daty.beautifyDatesRange(this.state.event.begin_time, this.state.event.end_time)
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
                  addFav: this.addToFavs,
                }}
                iconLeft={
                  <Icon type='arrowBack' width='24' height='24' color='#fff' />
                }
                iconRight={
                  <Icon type={this.isInFavs() ? 'bookmarkFill' : 'bookmark'} width='24' height='24' color='#fff' />
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
                    dangerouslySetInnerHTML={{ __html: event.description }}
                  />
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
                      width={410}
                      height={215}
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
    favs: state.user.favs,
  }),
  dispatch => ({
    goBack: () => {
      dispatch(goBack())
    },
    addToFavs: (event) => {
      dispatch(addToFavs(event))
    },
    delFromFavs: (event) => {
      dispatch(delFromFavs(event))
    }
  })
)(Event)
