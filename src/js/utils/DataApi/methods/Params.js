export default class Params {
  params = {}
  computedParams = []

  add = (key, value) => {
    this.params[key] = value
    return this
  }
  clear = () => {
    this.params = {}
    this.computedParams = []
    this.queryString = ''
    return this
  }
  computeParams = () => {
    Object.keys(this.params).map((key) => {
      this.computedParams.push([key, this.params[key]].join('='))
    })
    return this
  }
  getComputedParams = () => {
    return this.computeParams().computedParams
  }
  getQueryString = () => {
    this.computeParams() // @todo: cache
    return this.computedParams.join('&')
  }
}
