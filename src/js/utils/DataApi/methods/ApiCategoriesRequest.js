import ApiRequest from './ApiRequest'

class ApiCategoriesRequest extends ApiRequest {
  constructor(methodId) {
    super(methodId)
    this.params.add('type', 'bycategories')
  }
}

export default ApiCategoriesRequest
