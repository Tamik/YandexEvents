import ApiRequest from './ApiRequest'

class ApiPlacesRequest extends ApiRequest {
  orderByRating = () => {
    this.params.add('order_col', 'rating')
  }
  itemsPerPage = (itemsPerPage) => {
    this.params.add('items_per_page', itemsPerPage)
    return this
  }
}
export default ApiPlacesRequest
