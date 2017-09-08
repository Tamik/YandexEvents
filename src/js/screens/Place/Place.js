import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { goBack } from 'actions/navigationActions'

import { BottomNav, StaticMap } from 'components'

import { List as ListContainer } from 'containers'

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
    const place = this.state.place
    return (
      <div>
        {this.state.loading
          ? (<Spinner />)
          : (
            <div className='screen'>
              <TopBar
                title={place.title}
                icon={
                  <button onClick={this.goBack}>
                    <Icon type='arrowBack' width='24' height='24' color='#000' />
                  </button>
                }
              />
              <Container stretching scrolling>
                <Image
                  size='large'
                  src={`${process.env.HOST}/i/places/${place.id}_large.jpg`}
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
                  <ListContainer />
                  <div style={{ margin: '16px 0' }}>
                    <hr style={{ backgroundColor: '#e5e5e5', border: 'none', height: 1 }} />
                    <StaticMap coords={[place.lng, place.lat]} zoom={15} width={410} height={215} />
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
              <BottomNav />
            </div>
          )}
      </div>
    )
  }
}

Place.propTypes = {
  params: PropTypes.object.isRequired,
  onGoBack: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    placeData: state.data.placeData,
  }),
  dispatch => ({
    onGoBack: () => {
      dispatch(goBack())
    },
  })
)(Place)

