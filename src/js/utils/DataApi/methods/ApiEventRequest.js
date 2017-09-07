import ApiRequest from './ApiRequest'

class ApiEventRequest extends ApiRequest {
  byId(id) {
    this.params.add('id', id)
    return this
  }
}

export default ApiEventRequest
