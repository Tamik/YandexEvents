import React, { Component } from 'react'
import { connect } from 'react-redux'
import { YMaps, Map as YMap, Clusterer, Placemark } from 'react-yandex-maps'

import { push } from 'actions/navigationActions'
import { sendModalEventData } from 'actions/dataActions'

import { MapCard, Icon, Slider, Spinner } from 'ui-components'

import { DataApi } from 'utils'

import {
  GEOLOCATION_WATCH_TIMEOUT,
  CLUSTER_STYLE_PRESET,
  EVENT_STYLE_PRESET,
  MYLOCATION_STYLE_PRESET,
  INIT_ZOOM,
  MAX_ZOOM,
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
  BtnRounded,
  CardContainer,
} from './styles'

/**
 * @see
 * @module Map
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

  componentWillUpdate(nextProps) {
    const isCategoryEqual = this.props.categoryId === nextProps.categoryId

    if (this.clusterer && !isCategoryEqual) {
      this.clearMap()
      this.closeBalloon()
      this.onClustererInited(this.clusterer, nextProps.categoryId)
    }
  }

  /**
   * @description При unmount'е компонента перестаем "слушать" геопозицию пользователя
   */
  componentWillUnmount() {
    this.isComponentMounted = false
    this.stopWatchingMyLocation()
    this.watchLocationID = 0
    this.state.balloonItemsPreview = null
  }

  /**
   * @method onGeolocationSuccess
   * @description Обработчик выполнится после успешно определенного
   * текущего местоположения пользователя
   * @param {Object} pos 
   * @see https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-geolocation/
   */
  onGeolocationSuccess = (pos) => {
    const position = [pos.coords.latitude, pos.coords.longitude]
    /**
     * @description Добавляем метку с местоположением пользователя
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
     * @description Не центрировать карту на местоположение пользователя
     */
    if (this.props.panToLocation !== undefined) {
      return
    }

    /**
     * @description Центрируем карту на мое местоположение, если разрешено
     * @todo Сделать через {state}
     */
    if (this.props.panToMyLocation
      && this.map
      && this.doAutoPan /* пользователь еще не двигал карту */
      && this.isComponentMounted) {
      this.map.panTo(position, {
        duration: 1000,
        flying: false,
        safe: true,
      }).then(() => {
        /**
         * @description Если не задан zoom, то устанавливаем zoom автоматически
         */
        if (!this.props.zoom) {
          this.setZoom(MAP_ZOOM_TO_MY_LOCATION)
        }
      })
    }

    /**
     * @description Кешируем местоположение пользователя
     */
    this.cachedMyLocation = {
      time: getTimeEpoch(),
      pos: position,
    }

    /**
     * @description Отключаем компонент загрузки, включаем карту
     */
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
   * @method onMapApiReady
   * @description Обработчик выполнится как только API Яндекс.Карт
   * загружено и готово к использованию
   * @param {Object} api - ref на статичный объект API Яндекс карт 
   */
  onMapsApiReady = (api) => {
    yMapsApi = api // Не вносим в контекст компонента, т.к api – это статичный объект

    const topBarHeight = 76
    const screenHeight = window.innerHeight
    this.mapHeight = Math.abs(topBarHeight - screenHeight)
  }

  /**
   * @method onMapInited
   * @description Обработчик выполнится как только контейнер карты будет готов к загрузке тайлов
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
   * @method onClustererInited
   * @description Обработчик выполнится сразу после того как кластерер из меток будет создан
   * @param {Object} refClusterer 
   */
  onClustererInited = (refClusterer, newCategoryId) => {
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
      const getData = DataApi.getEvents().byHoliday(1)

      if (this.props.categoryId !== 'undefined') {
        getData.byCategory(newCategoryId || this.props.categoryId)
      }

      getData.itemsPerPage(100).perform().then((response) => {
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

  /**
   * @method setZoom
   * @description Задает масштабирование карты 
   * @param {numbers} newZoom [1..23]
   */
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

  /**
   * @method setCenter
   * @description Центрирует карту к заданным координатам
   * @param {Array} coords
   */
  setCenter = (coords) => {
    this.setState({
      mapState: {
        ...this.state.mapState,
        center: coords,
      },
    })

    this.doAutoPan = false
  }

  /**
   * @method getEventById
   * @description Метод получает событие по id из коллекции меток на карте
   * @param {numbers} eventId
   */
  getEventById = eventId => (this.points[this.eventsToPointsMap[eventId]])

  /**
   * @method afterEventsLoaded
   * @description Обработчик, которые срабатывает при вызове после загрузки данных о событиях
   */
  afterEventsLoaded = () => {
    this.addPlacemarks()
    this.bindEventsOnClusterer()

    /* dev:start */
    // Кнопка Вернуться к событию
    // if (this.props.panToLocation !== undefined) {
    //   this.map.controls.add(this.makeBtnGotoEventLocation(), { float: 'right' })
    // }
    /* dev:end */

    this.bindMapEvents()
    this.startWatchingMyLocation()

    const centerAndZoom = yMapsApi.util.bounds.getCenterAndZoom(
      this.clusterer.getBounds(),
      this.map.container.getSize(),
      this.map.options.get('projection')
    )
    this.setState({
      loading: false,
      mapState: {
        ...this.state.mapState,
        center: centerAndZoom.center,
        zoom: centerAndZoom.zoom,
      },
    })
    // this.setState({
    //   loading: false,
    // })
  }

  /* dev:start */
  /**
   * @method sortEventsByDistance
   * @description Метод сортировки данных (в данном случае событий) по расстоянию от пользователя
   */
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

  /**
   * @method bindEventsOnClusterer
   * @description Обработчик пользовательского взаимодействия с кластером
   */
  bindEventsOnClusterer = () => {
    /**
     * @description При клике по метке в кластере – открывается кастомный баллун
     * со списком событий, свернутых в этот кластер
     */
    this.clusterer.events.add('click', (event) => {
      const items = []

      /**
       * @description Одно событие (маркер)
       */
      if (event.get('target').getGeoObjects === undefined) {
        const placemark = event.get('target')
        const eventId = placemark.properties.get('eventId')
        items.push(this.getEventById(eventId))
      }
      /**
       * @description Несколько событий (кластер)
       */
      else {
        const objects = event.get('target').getGeoObjects()
        objects.map((item) => {
          const eventId = item.properties.get('eventId')
          items.push(this.getEventById(eventId))
          return item
        })
      }
      /* dev:end */

      this.openBalloon(items)
    })
  }

  /**
   * @method bindMapEvents
   * @description Обработчик пользовательского взаимодействия с картой
   */
  bindMapEvents = () => {
    /**
     * @description Скрываем карточки (баллун), если пользователь сдвинул карту
     */
    this.map.events.add('multitouchstart', (event) => {
      this.doAutoPan = false
      if (this.isBalloonOpened()) {
        this.closeBalloon()
      }
    })

    /**
     * @description Скрываем карточки (баллун), если пользователь тапнул по карте
     */
    this.map.events.add('mousedown', (event) => {
      this.doAutoPan = false
      if (this.isBalloonOpened()) {
        this.closeBalloon()
      }
    })
  }

  /* dev:start */
  /**
   * @method makeBtnGotoEventLocation
   * @description "Конструктор" кнопки, при нажатии на которую карта
   * спозиционируется к метке события
   * @returns {Object}
   */
  // makeBtnGotoEventLocation = () => {
  //   const btnGoToEventLocation = new yMapsApi.control.Button(
  //     {
  //       data: {
  //         content: '<strong>Событие</strong>',
  //       },
  //       options: {
  //         selectOnClick: false,
  //       },
  //     }
  //   )

  //   btnGoToEventLocation.events.add('click', (event) => {
  //     this.map.panTo(this.props.panToLocation, {
  //       duration: 1000,
  //       flying: true,
  //       safe: true,
  //     }).then(() => {
  //       this.map.setZoom(this.props.zoom || MAP_ZOOM_TO_MY_LOCATION, { duration: 800 })
  //     })
  //   })

  //   return btnGoToEventLocation
  // }
  /* dev:end */

  /**
   * @method addPlacemarks
   * @description Добавляет маркеры на карту
   * @return
   */
  addPlacemarks = () => {
    const geoObjects = []

    /**
     * @description Создание маркеров
     */
    this.points.map((eventData) => {
      geoObjects.push(this.createPlacemark(eventData, eventData.id))
      return eventData
    })

    /**
     * @description Если плотность маркеров на сектор большая, помещаем маркеры в кластер
     */
    if (!this.props.isOneEvent) {
      this.clusterer.add(geoObjects)
      this.map.geoObjects.add(this.clusterer)
      return
    }

    /**
     * @description Отобразить метку, без кластера
     */
    this.map.geoObjects.add(geoObjects[0])
  }

  /**
   * @method createPlacemark
   * @description Создает объект метки на основе полученных данных
   * @param {Object} event
   * @returns {Object}
   */
  createPlacemark = (event) => {
    let placemark = null

    if (this.props.categoryId === this.props.config.map.category.toString()) {
      placemark = new yMapsApi.Placemark(
        [event.lat, event.lng],
        {
          eventId: event.id,
        }, // for empty balloon
        {
          iconLayout: 'default#image',
          iconImageHref: this.props.config.map.marker,
          iconImageSize: [36, 36],
          iconImageOffset: [0, 0],
        }
      )
    }
    else {
      placemark = new yMapsApi.Placemark(
        [event.lat, event.lng],
        {
          eventId: event.id,
        }, // for empty balloon
        this.props.placemarkOptions || EVENT_PLACEMARK_OPTIONS,
      )
    }

    return placemark
  }

  clearMap = () => {
    this.points = []
    this.clusterer.removeAll()
  }

  /**
   * @method showMyPosition
   * @description Показывает пользователю его местоположение
   * @return
   */
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
            backgroundColor: 'rgba(96, 125, 139, 1)',
            textColor: '#ffffff',
            textSize: 20.5,
            cornerRadius: 16,
            horizontalPadding: 20,
            verticalPadding: 16,
          },
        })
      }, { enableHighAccuracy: false })
  }

  zoomIn = () => {
    const zoom = this.state.mapState.zoom < MAX_ZOOM ? this.state.mapState.zoom + 1 : MAX_ZOOM
    this.setZoom(zoom)
  }

  zoomOut = () => {
    const zoom = this.state.mapState.zoom > MIN_ZOOM ? this.state.mapState.zoom - 1 : MIN_ZOOM
    this.setZoom(zoom)
  }

  /**
   * @method startWatchingMyLocation
   * @description Начать отслеживать местоположение пользователя
   */
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

  /**
   * @method stopWatchingMyLocation
   * @description Прекратить отслеживать местоположение пользователя
   */
  stopWatchingMyLocation = () => {
    if (this.watchLocationID) {
      navigator.geolocation.clearWatch(this.watchLocationID)
    }
  }

  /* dev:start */
  /**
   * @method changeZoomToCity
   * @description Изменить масштабирование карты на город
   */
  changeZoomToCity = () => {
    this.map.setZoom(10)
    if (this.points.length > 0) {
      this.openBalloon(this.points)
    }
  }
  /* dev:end */

  /**
   * @method isBalloonOpened
   * @description Проверка, открыт ли баллун
   * @returns {bool}
   */
  isBalloonOpened = () => (this.state.balloonItemsPreview !== null)

  /**
   * @method openBallon
   * @description Открыть баллун с входящими данными
   * @param {Array} items
   */
  openBalloon = (items) => {
    this.setState({
      balloonItemsPreview: items,
    })
  }

  /**
   * @method closeBalloon
   * @description Закрыть баллун
   */
  closeBalloon = () => {
    this.setState({
      balloonItemsPreview: null,
    })
  }

  /**
   * @method viewEvent
   * @description Открыть экран события
   * @param {Object} event
   */
  viewEvent = (event) => {
    this.props.onViewEvent(event)
  }

  renderEvents = (events) => {
    if (events.length > 1) {
      return (
        <div>
          <Slider infinite={false}>
            {events.map(item => (
              <MapCard
                key={item.id}
                option='slider'
                src={`http://io.yamblz.ru/i/events/${item.id}_small.jpg`}
                title={item.title}
                isLeft={item.is_left}
                location={item.location_title}
                time={{ begin: item.begin_time, end: item.end_time }}
                onClick={() => this.viewEvent(item)}
              />
            ))}
          </Slider>
        </div>
      )
    }

    return (
      <div>
        {events.map(item => (
          <CardContainer key={item.id}>
            <MapCard
              src={`http://io.yamblz.ru/i/events/${item.id}_small.jpg`}
              title={item.title}
              isLeft={item.is_left}
              location={item.location_title}
              time={{ begin: item.begin_time, end: item.end_time }}
              onClick={() => this.viewEvent(item)}
            />
          </CardContainer>
        ))}
      </div>
    )
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
                clusterDisableClickZoom: true,
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
        <BtnRounded
          style={{ top: 168 }}
          className={this.state.isMyLocationLoading ? 'btn-map-rounded btn-goto-mylocation btn-goto-mylocation__loading' : 'btn-map-rounded btn-goto-mylocation'}
          onClick={this.showMyPosition}
        >
          {this.state.isMyLocationLoading
            ? <div className='radar-spinner' />
            : ''
          }
          <Icon type='mylocation' width='22' height='24' />
        </BtnRounded>
        <BtnRounded
          style={{ top: 24 }}
          className='btn-map-rounded'
          onClick={this.zoomIn}
        >
          <Icon type='zoomIn' width='20' height='24' />
        </BtnRounded>
        <BtnRounded
          style={{ top: 96 }}
          className='btn-map-rounded'
          onClick={this.zoomOut}
        >
          <Icon type='zoomOut' width='20' height='24' />
        </BtnRounded>
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
                ? this.renderEvents(this.state.balloonItemsPreview)
                : null
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
  state => ({
    config: state.data.configData,
  }),
  dispatch => ({
    onViewEvent: (event) => {
      dispatch(sendModalEventData(event))
      dispatch(push(`/event/${event.id}`))
    },
  })
)(Map)
