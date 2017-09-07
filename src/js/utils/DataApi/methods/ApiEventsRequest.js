import ApiRequest from './ApiRequest'

class ApiEventsRequest extends ApiRequest {
  byCategory = (id) => {
    this.params.add('category', id)
    return this
  }
  byEntity = (id) => {
    this.params.add('entity', id)
    return this
  }
  byDate = (date) => {
    // @todo: refactoring params to array
    let index = 0
    Object.keys(this.params.params).map((key) => {
      if (key.toString().indexOf('date') > -1) {
        index += 1
      }
      return index
    })

    this.params.add(`date[${index}]`, date)
    return this
  }
  orderByBeginTime = () => {
    this.params.add('order_col', 'begin_time')
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
