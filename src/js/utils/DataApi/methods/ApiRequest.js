import axios from 'axios'
import { API_HOST } from '../consts'
import Params from './Params'

const methodUrl = methodId => `${API_HOST}/${methodId}`

export default class ApiRequest {
  method = null
  params = new Params()

  constructor(methodId) {
    this.method = methodUrl(methodId)
  }
  byHoliday = (holidayId) => {
    this.params.add('holiday', holidayId)
    return this
  }
  anyParam = (param, value) => {
    this.params.add(param, value)
    return this
  }
  fillParams = (params) => {
    this.params.fill(params)
    return this
  }
  perform = () => {
    const queryString = this.params.getQueryString()
    const uri = queryString
      ? [this.method, queryString].join('?')
      : this.method
    return axios.get(uri)
  }
}
