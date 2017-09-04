import ApiRequest from './ApiRequest'

class ApiPlacesRequest extends ApiRequest {
  constructor(methodId) {
    super(methodId)
    this.params.add('type', 'byplaces')
  }
}
export default ApiPlacesRequest
