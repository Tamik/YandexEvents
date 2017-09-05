import ApiRequest from './ApiRequest'

class ApiDatesWithEventsRequest extends ApiRequest {
  byCategory = (id) => {
    this.params.add('category', id)
    return this
  }
  byPlace = (id) => {
    this.params.add('place', id)
    return this
  }
}

export default ApiDatesWithEventsRequest
