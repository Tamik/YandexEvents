import ApiRequest from './ApiRequest'

class ApiEntitiesRequest extends ApiRequest {
  byCategory(category) {
    this.params.add('category', category)
    return this
  }
}

export default ApiEntitiesRequest
