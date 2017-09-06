import { API_METHODS } from '../consts'
import {
  ApiEventsRequest,
  ApiCategoriesRequest,
  ApiPlacesRequest,
  ApiDatesWithEventsRequest,
  ApiHolidayConfigRequest,
  ApiHolidaysRequest,
  ApiHintRequest,
} from './'

const ApiRequestFabric = (methodId) => {
  switch (methodId) {
    case API_METHODS.GET_HOLIDAYS:
      return new ApiHolidaysRequest(API_METHODS.GET_HOLIDAYS)
    case API_METHODS.GET_HINT:
      return new ApiHintRequest(API_METHODS.GET_HINT)
    case API_METHODS.GET_EVENTS:
      return new ApiEventsRequest(API_METHODS.GET_EVENTS)
    case API_METHODS.GET_CATEGORIES:
      return new ApiCategoriesRequest(API_METHODS.GET_CATEGORIES)
    case API_METHODS.GET_PLACES:
      return new ApiPlacesRequest(API_METHODS.GET_PLACES)
    case API_METHODS.GET_DATES_WITH_EVENTS:
      return new ApiDatesWithEventsRequest(API_METHODS.GET_DATES_WITH_EVENTS)
    case API_METHODS.GET_HOLIDAY_CONFIG:
      return new ApiHolidayConfigRequest(API_METHODS.GET_HOLIDAY_CONFIG)
    default:
      return null
  }
}

export default ApiRequestFabric
