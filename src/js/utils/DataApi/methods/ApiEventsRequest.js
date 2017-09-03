import ApiRequest from './ApiRequest'

class ApiEventsRequest extends ApiRequest {
  byCategory = (id) => {
    this.params.add('category', id)
    return this
  }
  byDate = (date) => {
    this.params.add('date', date)
    return this
  }
  byPlace = (id) => {
    this.params.add('place', id)
    return this
  }
  itemsPerPage = (itemsPerPage) => {
    this.params.add('items_per_page', itemsPerPage)
    return this
  }
  page = (page) => {
    this.params.add('page', page)
    return this
  }
}

export default ApiEventsRequest
