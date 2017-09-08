import ApiRequest from './ApiRequest'

class ApiEntityRequest extends ApiRequest {
  byId(id) {
    this.params.add('id', id)
    return this
  }
}

export default ApiEntityRequest
