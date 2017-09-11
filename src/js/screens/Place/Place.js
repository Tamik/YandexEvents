import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { goBack } from 'actions/navigationActions'
import { clearModalPlaceData } from 'actions/dataActions'

import { BottomNav, StaticMap } from 'components'

import { List as ListContainer } from 'containers'

import { Event } from 'screens'

import { Container, TopBar, Icon, Image, Spinner } from 'ui-components'

import { DataApi } from 'utils/DataApi'

class Place extends Component {
  state = {
    place: {},
    loading: false,
  }

  componentWillMount() {
    DataApi.getPlace()
      .byHoliday(1)
      .byId(this.props.params.placeId)
      .perform()
      .then(response => this.setState({
        place: response.data.data,
      }))
  }

  goBack = () => {
    this.props.onGoBack()
  }

  render() {
    console.log('this.props.eventData: ', this.props.eventData)
    const place = this.state.place
    return (
      <div>
        {this.state.loading
          ? (<Spinner />)
          : (
            <div className='screen'>
              <TopBar
                title={place.title}
                onClick={{
                  back: this.goBack,
                }}
                iconLeft={
                  <Icon type='arrowBack' width='24' height='24' color='#000' />
                }
              />
              <Container stretching scrolling>
                <Image
                  size='large'
                  src={place.photo_large}
                />
                <div>
                  <div
                    style={{
                      margin: '0 16px',
                    }}
                  >
                    <p
                      style={{
                        fontSize: '1rem',
                        lineHeight: '1.375rem',
                        color: '#000',
                        marginTop: 16,
                        marginBottom: 24,
                      }}
                    >
                      {place.description}
                    </p>
                    <h2>Расписание</h2>
                  </div>
                  <ListContainer
                    params={{
                      method: 'events',
                      holiday: 1,
                      placeId: this.props.params.placeId,
                    }}
                  />
                  <div
                    style={{
                      margin: '16px',
                    }}
                  >
                    <hr style={{
                      backgroundColor: '#e5e5e5',
                      border: 'none',
                      height: 1,
                    }}
                    />
                    <StaticMap
                      coords={[place.lng, place.lat]}
                      zoom={15}
                      width={372}
                      height={172}
                    />
                    <p
                      style={{
                        fontSize: '0.875rem',
                        marginTop: 8,
                        color: '#000',
                        lineHeight: '1.25rem',
                      }}
                    >{place.address}</p>
                  </div>
                </div>
              </Container>
              {this.props.eventData && this.props.eventData !== '__CLOSE__'
                ? <div style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  zIndex: 2000,
                  background: '#fff',
                  width: '100vw',
                  height: '100vh',
                }}
                >
                  <Event params={{ eventId: this.props.eventData.id }} />
                </div>
                : ''}
            </div>
          )}
      </div>
    )
  }
}

Place.propTypes = {
  params: PropTypes.shape().isRequired,
  onGoBack: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    placeData: state.data.placeData,
    eventData: state.data.eventData,
  }),
  dispatch => ({
    onGoBack: () => {
      dispatch(goBack())
      dispatch(clearModalPlaceData())
    },
  })
)(Place)

