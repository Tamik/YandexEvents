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
  getEvents: () => {
    this.request = new ApiRequestFabric(API_METHODS.GET_EVENTS)
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
  getDatesWithEvents: () => {
    this.request = new ApiRequestFabric(API_METHODS.GET_DATES_WITH_EVENTS)
    return this.request
  },
  getHolidayConfig: () => {
    this.request = new ApiRequestFabric(API_METHODS.GET_HOLIDAY_CONFIG)
    return this.request
  },
  perform: () => this.request.perform().then(response => response.data),
}

// DataApi.getHolidayConfig()
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
//   .byPlace(12)
//   .page(1)
//   .itemsPerPage(20)

// getEvents.perform()
//   .then((response) => {
//     console.log('Events: ', response.data)
//   })

// /**
//  * @example Get categories list
//  */
// DataApi.getCategories()
//   .byHoliday(1)
//   .perform()
//   .then((response) => {
//     console.log('Categories: ', response.data)
//   })

// /**
//  * @example Get places
//  */
// DataApi.getPlaces()
//  .byHoliday(1)
//   // .limit(10) // @todo: back-end
//   // .orderBy('column', 'desc') // @todo: back-end
//   .perform()
//   .then((response) => {
//     console.log('Places: ', response.data)
//   })

// /**
//  * @example Get all dates with events
//  */
// DataApi.getDatesWithEvents()
//   .byHoliday(1)
//   .byCategory(9)
//   // .byPlace(10) // @TODO: back-end
//   .perform()
//   .then((response) => {
//     console.log('Dates with planned events: ', response.data)
//   })

export default DataApi
