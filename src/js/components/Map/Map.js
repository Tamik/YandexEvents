import React, { Component } from 'react'
import { connect } from 'react-redux'
import { YMaps, Map as YMap, Clusterer, Placemark } from 'react-yandex-maps'

import { push } from 'actions/navigationActions'
import { sendModalEventData } from 'actions/dataActions'

import { MapCard, Icon, Spinner } from 'ui-components'

import { DataApi } from 'utils/DataApi'

import {
  GEOLOCATION_WATCH_TIMEOUT,
  CLUSTER_STYLE_PRESET,
  EVENT_STYLE_PRESET,
  MYLOCATION_STYLE_PRESET,
  INIT_ZOOM,
  MIN_ZOOM,
  CONTROLS,
  MAP_ZOOM_TO_MY_LOCATION,
  POINT_TYPES,
  EVENT_PLACEMARK_OPTIONS,
  MYLOCATION_PLACEMARK_OPTIONS,
  formatDistance,
  getTimeEpoch,
} from './settings'
import {
  YMapsWrap,
  Pane,
  PaneInner,
  BalloonLayout,
  BalloonInner,
  BalloonTopBar,
  BtnClose,
  BalloonItemsWrap,
  BalloonEventItem,
  BalloonEventTitle,
  BalloonEventMeta,
  DistanceLabel,
  BtnGoToMyLocation,
} from './styles'

/**
 * @see
 * Map
 * Provider: yandex maps 2.1
 * Coords in yandex placemarks: [lat, lng]
 * Cluster docs: https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/ClusterPlacemark.xml
 * Icons styles: https://tech.yandex.ru/maps/doc/jsapi/2.1/ref/reference/option.presetStorage-docpage
 * React module: https://github.com/gribnoysup/react-yandex-maps/blob/master/src/Map.js
 * 
 * @todo: 
 * - Разбить на модули
 * - Красиво убрать из компонента подгрузку событий, и что-то решить с ассинхронностью
 * - Вынести разметку и стили кастомных баллунов
 * - Вынести константы
 * - PropTypes
 */
let yMapsApi = null

class Map extends Component {
  constructor(props) {
    super(props)
    this.isComponentMounted = false
    this.watchLocationID = null
    this.doAutoPan = true
    this.eventsToPointsMap = {}
    this.lastOpenedBalloon = null
    this.cachedMyLocation = null
    this.points = props.points || []
    this.state = {
      myLocationPoint: {
        lat: 0,
        lng: 0,
      },
      isMyLocationLoading: false,
      balloonItemsPreview: null,
      mapState: {
        center: props.initCenter || [55.751574, 37.573856],
        zoom: props.zoom || INIT_ZOOM,
        controls: CONTROLS,
        minZoom: MIN_ZOOM,
      },
      loading: true,
    }
  }

  componentDidMount() {
    this.isComponentMounted = true
  }

  componentWillUnmount() {
    this.isComponentMounted = false
    this.stopWatchingMyLocation()
    this.watchLocationID = 0
    this.state.balloonItemsPreview = null
  }

  /**
   * @description Обработчик выполнится после успешно определенного текущего местоположения
   * @param {Object} pos 
   * @see https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-geolocation/
   */
  onGeolocationSuccess = (pos) => {
    const position = [pos.coords.latitude, pos.coords.longitude]
    /**
     * @description Добавляем метку с моим местоположением
     */
    if (this.isComponentMounted && this.map) {
      this.setState({
        myLocationPoint: {
          ...this.state.myLocationPoint,
          lat: position[0],
          lng: position[1],
        },
      })
    }

    /**
     * @description Не будем центрировать карту на мое местоположение,
     */
    if (this.props.panToLocation !== undefined) {
      return
    }

    /**
     * @description Центрируем карту на мое местоположение, если разрешено
     * @todo Подумать, как сделать через {state}
     */
    if (this.props.panToMyLocation
      && this.map
      && this.doAutoPan /* юзер еще не двигал карту */
      && this.isComponentMounted) {
      this.map.panTo(position, {
        duration: 1000,
        flying: false,
        safe: true,
      }).then(() => {
        // Если не задан zoom, то ставим зум сами
        if (!this.props.zoom) {
          this.setZoom(MAP_ZOOM_TO_MY_LOCATION)
        }
      })
    }

    this.cachedMyLocation = {
      time: getTimeEpoch(),
      pos: position,
    }

    this.setState({
      isMyLocationLoading: false,
    })

    /* dev:start */
    // if (!this.isOneEvent) {
    //   this.sortEventsByDistance()
    // }
    /* dev:end */
  }

  /**
   * @description Выполнится, как только API Яндекс карт загрузился и готов к использованию
   * @param {Object} api - ref на статичный объект API Яндекс карт 
   */
  onMapsApiReady = (api) => {
    yMapsApi = api // Не вносим в контекст компонента, т.к api - это статичный объект

    const topBarHeight = 76
    const screenHeight = window.innerHeight
    this.mapHeight = Math.abs(topBarHeight - screenHeight)
  }

  /**
   * @description Выполнится, как только контейнер карты будет готов к загрузке тайлов
   * @param {Object} mapInstance 
   */
  onMapInited = (refMapInstance) => {
    this.map = refMapInstance

    if (!this.isComponentMounted) {
      return
    }

    if (this.watchLocationID) {
      return
    }

    if (this.props.panToLocation !== undefined) {
      this.doAutoPan = false
      if (this.isComponentMounted && this.map) {
        this.setState({
          mapState: {
            ...this.state.mapState,
            center: this.props.panToLocation,
            zoom: this.props.zoom || MAP_ZOOM_TO_MY_LOCATION,
          },
        })
      }
    }

    this.setState({
      loading: false,
    })
  }

  /**
   * @description Выполнится, сразу полсе того, как кластерер меток событий будет создан 
   * @param {Object} refClusterer 
   */
  onClustererInited = (refClusterer) => {
    if (!this.isComponentMounted) {
      return
    }

    this.clusterer = refClusterer
    this.eventsToPointsMap = {}

    /**
     * @todo: Refactoring required: improve async code
     */
    if (this.props.isOneEvent) {
      // Map EventID to Point Index
      this.points.forEach((item, idx) => {
        this.eventsToPointsMap[item.id] = idx
      })

      this.afterEventsLoaded()
    }
    else {
      DataApi.getEvents()
        .byHoliday(1)
        .byCategory(this.props.categoryId)
        .itemsPerPage(100)
        .perform()
        .then((response) => {
          if (!this.isComponentMounted) {
            return
          }

          this.points = response.data.data
          this.points.forEach((item, idx) => {
            this.eventsToPointsMap[item.id] = idx
          })
          this.afterEventsLoaded()
        })
    }
  }

  setZoom = (newZoom) => {
    if (this.isComponentMounted) {
      this.setState({
        mapState: {
          ...this.state.mapState,
          zoom: newZoom,
        },
      })
    }

    this.doAutoPan = false
  }

  setCenter = (coords) => {
    this.setState({
      mapState: {
        ...this.state.mapState,
        center: coords,
      },
    })

    this.doAutoPan = false
  }

  getEventById = eventId => (this.points[this.eventsToPointsMap[eventId]])

  afterEventsLoaded = () => {
    this.addPlacemarks()
    this.bindEventsOnClusterer()

    // Кнопка Вернуться к событию
    if (this.props.panToLocation !== undefined) {
      this.map.controls.add(this.makeBtnGotoEventLocation(), { float: 'right' })
    }

    this.bindMapEvents()
    this.startWatchingMyLocation()
    this.setState({
      loading: false,
    })
  }

  /* dev:start */
  sortEventsByDistance = () => {
    let distance
    /**
     * @description Вычисляем дистанцию между пользователем и каждым событием,
     * и сортируем список по расстоянию
     */
    this.points.forEach((eventData) => {
      distance = yMapsApi.coordSystem.geo.getDistance(
        [eventData.lat, eventData.lng],
        [this.state.myLocationPoint.lat, this.state.myLocationPoint.lng]
      )
      /**
       * @description Populate distance to points collection
       */
      this.points[this.eventsToPointsMap[eventData.id]].distance = distance
    })

    this.points.sort((a, b) => a.distance - b.distance)
  }
  /* dev:end */

  bindEventsOnClusterer = () => {
    /**
     * @description При клике по метке в кластере – открывается кастомный баллун
     * со список событий, свернутых в этот кластер
     */
    this.clusterer.events.add('click', (e) => {
      const items = []

      // One event?
      if (e.get('target').getGeoObjects === undefined) {
        const placemark = e.get('target')
        const eventId = placemark.properties.get('eventId')
        items.push(this.getEventById(eventId))
      }
      // else {
      //   // Clustered events?
      //   const objects = e.get('target').getGeoObjects()
      //   objects.map((item) => {
      //     const eventId = item.properties.get('eventId')
      //     items.push(this.getEventById(eventId))
      //   })
      // }

      this.openBalloon(items)
    })
  }

  /**
   * @method Скрыть карточки (баллун)
   */
  bindMapEvents = () => {
    /**
     * @description Метод скрытия карточки (баллуна), если пользователь сдвинул карту
     */
    // Закрываем открытый балун, если карту сдвинули
    this.map.events.add('multitouchstart', (event) => {
      this.doAutoPan = false
      if (this.isBalloonOpened()) {
        this.closeBalloon()
      }
    })

    // Закрываем открытый балун если к карте прикоснулись
    /**
     * @description Вызывается скрытие карточки (баллуна), если пользователь коснулся карты
     */
    this.map.events.add('mousedown', (event) => {
      this.doAutoPan = false
      if (this.isBalloonOpened()) {
        this.closeBalloon()
      }
    })
  }

  makeBtnGotoEventLocation = () => {
    const btnGoToEventLocation = new yMapsApi.control.Button(
      {
        data: {
          content: '<strong>Событие</strong>',
        },
        options: {
          selectOnClick: false,
        },
      }
    )

    btnGoToEventLocation.events.add('click', (event) => {
      this.map.panTo(this.props.panToLocation, {
        duration: 1000,
        flying: true,
        safe: true,
      }).then(() => {
        this.map.setZoom(this.props.zoom || MAP_ZOOM_TO_MY_LOCATION, { duration: 800 })
      })
    })

    return btnGoToEventLocation
  }

  addPlacemarks = () => {
    const geoObjects = []

    // Creating placemarks
    this.points.map((eventData) => {
      geoObjects.push(this.createPlacemark(eventData, eventData.id))
      return eventData
    })

    // Если Просмотр множества событий, 
    // то множество меток помещаем на карту через кластерер
    if (!this.props.isOneEvent) {
      this.clusterer.add(geoObjects)
      this.map.geoObjects.add(this.clusterer)
      return
    }

    // Иначе, отобразим лишь одну метку, без кластерера
    this.map.geoObjects.add(geoObjects[0])
  }

  createPlacemark = (event) => {
    const placemark = new yMapsApi.Placemark(
      [event.lat, event.lng],
      {
        eventId: event.id,
      }, // for empty balloon
      this.props.placemarkOptions || EVENT_PLACEMARK_OPTIONS,
    )

    return placemark
  }

  showMyPosition = () => {
    if (!this.map) {
      return
    }

    if (this.map.panTo === undefined) {
      return
    }

    if (this.state.isMyLocationLoading) {
      return
    }

    this.setState({
      isMyLocationLoading: true,
    })

    this.stopWatchingMyLocation()

    if (this.cachedMyLocation) {
      // Throttling computation of my location 
      if (getTimeEpoch() - this.cachedMyLocation.time < 30) {
        this.setState({
          isMyLocationLoading: false,
        })

        this.map.panTo([this.state.myLocationPoint.lat, this.state.myLocationPoint.lng], {
          duration: 1000,
          flying: true,
          safe: true,
        }).then(() => {
          this.map.setZoom(MAP_ZOOM_TO_MY_LOCATION, { duration: 800 })
        })
        return
      }
    }

    /**
     * @todo: Caching my last position on 15-20 seconds
     */
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const position = [pos.coords.latitude, pos.coords.longitude]

        this.setState({
          isMyLocationLoading: false,
        })

        this.map.panTo([this.state.myLocationPoint.lat, this.state.myLocationPoint.lng], {
          duration: 1000,
          flying: true,
          safe: true,
        }).then(() => {
          this.map.setZoom(MAP_ZOOM_TO_MY_LOCATION, { duration: 800 })
        })

        this.cachedMyLocation = {
          time: getTimeEpoch(),
          pos: position,
        }

        /* dev:start */
        // if (!this.isOneEvent) {
        //   this.sortEventsByDistance()
        // }
        /* dev:end */

        this.startWatchingMyLocation()
      },
      (error) => {
        /**
         * @todo: PositionError.POSITION_UNAVAILABLE
         */
        window.plugins.toast.showWithOptions({
          message: 'Упс, включите GPS или Интернет!',
          duration: 'short',
          position: 'bottom',
          styling: {
            opacity: 0.75,
            backgroundColor: 'rgb(96, 125, 139)',
            textColor: '#ffffff',
            textSize: 20.5,
            cornerRadius: 16,
            horizontalPadding: 20,
            verticalPadding: 16,
          },
        })
      }, { enableHighAccuracy: false })
  }

  startWatchingMyLocation = () => {
    setTimeout(() => {
      this.watchLocationID = navigator.geolocation.watchPosition(
        this.onGeolocationSuccess,
        this.onGeolocationError,
        {
          timeout: GEOLOCATION_WATCH_TIMEOUT,
          maximumAge: 3000,
        }
      )
    }, 10)
  }
  stopWatchingMyLocation = () => {
    if (this.watchLocationID) {
      navigator.geolocation.clearWatch(this.watchLocationID)
    }
  }

  changeZoomToCity = () => {
    this.map.setZoom(10)
    if (this.points.length > 0) {
      this.openBalloon(this.points)
    }
  }

  isBalloonOpened = () => (this.state.balloonItemsPreview !== null)

  openBalloon = (items) => {
    this.setState({
      balloonItemsPreview: items,
    })
  }

  closeBalloon = () => {
    this.setState({
      balloonItemsPreview: null,
    })
  }

  viewEvent = (event) => {
    this.props.onViewEvent(event)
  }

  render() {
    return (
      <YMapsWrap className='maps-wrap'>
        <YMaps onApiAvaliable={this.onMapsApiReady}>
          <YMap
            state={this.state.mapState}
            instanceRef={(ref) => {
              this.onMapInited(ref)
            }}
            options={{
              minZoom: MIN_ZOOM,
              yandexMapDisablePoiInteractivity: true,
              suppressMapOpenBlock: true,
            }}
            width={this.props.width || '100%'}
            height={this.mapHeight}
          >
            <Clusterer
              instanceRef={(ref) => {
                this.onClustererInited(ref)
              }}
              options={{
                preset: CLUSTER_STYLE_PRESET,
                groupByCoordinates: false,
                hasBalloon: false,
                clusterDisableClickZoom: false,
                clusterHideIconOnBalloonOpen: false,
                geoObjectHideIconOnBalloonOpen: false,
              }}
            />
            {/* My Location Placemark */}
            {this.state.myLocationPoint.lat ? (
              <Placemark
                key={'mylocation'}
                geometry={{
                  coordinates: [this.state.myLocationPoint.lat, this.state.myLocationPoint.lng],
                }}
                options={MYLOCATION_PLACEMARK_OPTIONS}
              />
            ) : ''}
          </YMap>
        </YMaps>
        <BtnGoToMyLocation
          className={this.state.isMyLocationLoading ? 'btn-goto-mylocation btn-goto-mylocation__loading' : 'btn-goto-mylocation'}
          onClick={this.showMyPosition}
        >
          {this.state.isMyLocationLoading
            ? <div className='radar-spinner' />
            : ''
          }
          <Icon type='mylocation' width='24' height='24' />
        </BtnGoToMyLocation>
        <BalloonLayout
          style={{
            display: this.state.balloonItemsPreview ? 'block' : 'none',
          }}
        >
          <BalloonInner>
            <BalloonTopBar onClick={this.closeBalloon}>
              <BtnClose>Закрыть</BtnClose>
            </BalloonTopBar>
            <BalloonItemsWrap>
              {this.state.balloonItemsPreview
                ? this.state.balloonItemsPreview.map(item => (
                  <div key={item.id}>
                    <MapCard
                      src={`http://io.yamblz.ru/i/events/${item.id}_small.jpg`}
                      title={item.title}
                      location={item.location_title}
                      onClick={() => this.viewEvent(item)}
                    />
                  </div>
                )
                )
                : ''
              }
            </BalloonItemsWrap>
          </BalloonInner>
        </BalloonLayout>
        {this.state.loading
          ? <Spinner />
          : ''
        }
      </YMapsWrap>
    )
  }
}

export default connect(
  state => ({}),
  dispatch => ({
    onViewEvent: (event) => {
      dispatch(sendModalEventData(event))
      dispatch(push(`/event/${event.id}`))
    },
  })
)(Map)
