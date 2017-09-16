import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { goBack } from 'actions/navigationActions'
import { clearModalEntityData } from 'actions/dataActions'

import { List as ListContainer } from 'containers'

import { Event } from 'screens'

import { TopBar, Icon, Container, Spinner } from 'ui-components'

import { DataApi } from 'utils'

/**
 * @class Entity
 * @description Экран просмотра сущности
 */
class Entity extends Component {
  /**
   * @static propTypes
   */
  static propTypes = {
    params: PropTypes.shape().isRequired,
    goBack: PropTypes.func.isRequired,
  }

  /**
   * @property state
   * @description Состояние компонента
   */
  state = {
    entity: {},
    loading: true,
  }

  componentWillMount() {
    DataApi.getEntity()
      .byHoliday(1)
      .byId(this.props.params.entityId)
      .perform()
      .then(response => this.setState({
        entity: response.data.data,
        loading: false,
      }))
  }

  /**
   * @method goBack
   * @description Вернуться на предыдущий экран
   */
  goBack = () => {
    this.props.goBack()
  }

  render() {
    const entity = this.state.entity
    return (
      <div>
        {this.state.loading
          ? (<Spinner />)
          : (
            <div className='screen'>
              <TopBar
                title={entity.title}
                onClick={{
                  back: this.goBack,
                }}
                iconLeft={
                  <Icon type='arrowBack' width='24' height='24' color='#000' />
                }
              />
              <Container scrolling stretching>
                <ListContainer
                  route='/event/%'
                  params={{
                    method: 'events',
                    holiday: 1,
                    entity: this.props.params.entityId,
                  }}
                  child={{ type: 'card', params: { size: 'medium' } }}
                />
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
                : null}
            </div>
          )
        }
      </div>
    )
  }
}

export default connect(
  state => ({
    entityData: state.data.entityData,
    eventData: state.data.eventData,
  }),
  dispatch => ({
    goBack: () => {
      dispatch(goBack())
      dispatch(clearModalEntityData())
    },
  })
)(Entity)
