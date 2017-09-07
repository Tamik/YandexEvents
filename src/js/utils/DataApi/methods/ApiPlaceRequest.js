import ApiRequest from './ApiRequest'

class ApiPlaceRequest extends ApiRequest {
  byId(id) {
    this.params.add('id', id)
    return this
  }
}

export default ApiPlaceRequest
