import { API_METHODS } from './consts'
import ApiRequestFabric from './methods/ApiRequestFabric'

/**
 * Библиотека для работы с серверным API
 */
/**
 * ideas: 
 * - cityId?
 * - setting holidayId by default for all requests?
 */
const DataApi = {
  getHolidays: () => {
    this.request = new ApiRequestFabric(API_METHODS.GET_HOLIDAYS)
    return this.request
  },
  getHint: () => {
    this.request = new ApiRequestFabric(API_METHODS.GET_HINT)
    return this.request
  },
  getEntities: () => {
    this.request = new ApiRequestFabric(API_METHODS.GET_ENTITIES)
    return this.request
  },
  getHolidayConfig: (holidayId) => {
    this.request = new ApiRequestFabric(API_METHODS.GET_HOLIDAY_CONFIG)
    this.request.params.add('holiday', holidayId)
    return this.request
  },
  getEvents: () => {
    this.request = new ApiRequestFabric(API_METHODS.GET_EVENTS)
    return this.request
  },
  getEvent: () => {
    this.request = new ApiRequestFabric(API_METHODS.GET_EVENT)
    return this.request
  },
  getCategories: () => {
    this.request = new ApiRequestFabric(API_METHODS.GET_CATEGORIES)
    return this.request
  },
  getPlaces: () => {
    this.request = new ApiRequestFabric(API_METHODS.GET_PLACES)
    return this.request
  },
  getPlace: () => {
    this.request = new ApiRequestFabric(API_METHODS.GET_PLACE)
    return this.request
  },
  getDatesWithEvents: () => {
    this.request = new ApiRequestFabric(API_METHODS.GET_DATES_WITH_EVENTS)
    return this.request
  },
  prepareQuery: (blockData) => {
    const params = {}
    Object.keys(blockData).map((key) => {
      if (key === 'method') {
        this.request = new ApiRequestFabric(blockData[key])
        return this.request
      }
      params[key] = blockData[key]
    })

    this.request.fillParams(params)
    return this.request
  },
}

// /**
//  * @example: Get events by entity
//  */
// DataApi.getEvents()
//   .byHoliday(1)
//   .byEntity(1)
//   .perform()
//   .then((response) => {
//     console.log('Get events by entity: ', response.data)
//   })

// /**
//  * @example: get entities
//  */
// DataApi.getEntities()
//   .byHoliday(1)
//   .byCategory('artists')
//   .perform()
//   .then((response) => {
//     console.log('Get artists: ', response.data)
//   })

// /**
//  * @example: get event extra
//  */
// DataApi.getEvent()
//   .byHoliday(1)
//   .byId(34867088)
//   .perform()
//   .then((response) => {
//     console.log('Event: ', response.data)
//   })

// /**
//  * @example: get hint
//  */
// DataApi.getHint()
//   .byHoliday(1)
//   .perform()
//   .then((response) => {
//     console.log('Hint: ', response.data)
//   })

// /**
//  * @example: get holidays
//  */
// DataApi.getHolidays()
//   .perform()
//   .then((response) => {
//     console.log('Holidays: ', response.data)
//   })

/**
 * @example: get block data
 */
// const testBlockDataEvents = {
//   method: 'events',
//   holiday: 2,
//   page: 1,
//   items_per_page: 5,
// }
// const testBlockDataPlaces = {
//   method: 'places',
//   holiday: 2,
//   page: 1,
//   items_per_page: 10,
//   order_col: 'rating',
// }

// DataApi
//   .prepareQuery(testBlockDataEvents)
//   .perform()
//   .then(response => console.log('Block response: ', response))

/**
 * @example: Get holiday config
 */
// DataApi.getHolidayConfig('md')
//   .perform()
//   .then((response) => {
//     console.log('Holiday config: ', response)
//   })

// /**
//  * @example Get events
//  */
// DataApi.getEvents()
//   .byHoliday(1)
//   .byCategory(9)
//   .byPlace(12)
//   .page(1)
//   .itemsPerPage(20)
//   .perform()
//   .then((response) => {
//     console.log('Events: ', response.data)
//   })

// // Variant two
// const getEvents = DataApi.getEvents()
//   .byHoliday(1)
//   .byCategory(9)
//   .byPlace(1)
//   .byDate('2017-09-09') // 09-09
//   .byDate('2017-09-10') // and 09-10
//   .page(1)
//   .itemsPerPage(20)

// getEvents.perform()
//   .then((response) => {
//     console.log('Events: ', response.data)
//   })

/**
 * @example Get categories list
 */
// DataApi.getCategories()
//   .byHoliday(1)
//   .perform()
//   .then((response) => {
//     console.log('Categories: ', response.data)
//   })

/**
 * @example Get places
 */
// DataApi.getPlaces()
//  .byHoliday(1)
//   .itemsPerPage(10)
//   .orderByRating()
//   .perform()
//   .then((response) => {
//     console.log('Places: ', response.data)
//   })

/**
 * @example Get all dates with events
 */
// DataApi.getDatesWithEvents()
//   .byHoliday(1)
//   .byCategory(9)
//   // .byPlace(10) // @TODO: back-end
//   .perform()
//   .then((response) => {
//     console.log('Dates with planned events: ', response.data)
//   })

// /**
//  * @example: Get place
//  */
// DataApi.getPlace()
//   .byHoliday(1)
//   .byId(1)
//   .perform()
//   .then((response) => {
//     console.log('Get place: ', response.data)
//   })

export default DataApi
