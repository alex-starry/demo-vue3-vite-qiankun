import * as services from './services'
import store from '../../store'
import axios, { AxiosRequestConfig } from 'axios'
import { IUser, IHttpResponse, IHttpRequestConfig } from '../../types'
import { Error } from '../../utils/error'
import qs from 'qs'

const instance = axios.create({
  timeout: 10000,
  withCredentials: true
})

instance.interceptors.request.use(config => {
  if (config.headers === undefined) {
    return config
  }
  const { tokenType, tokenValue, tenantId } = store.state.user as IUser
  if (!config.headers.Authorization && tokenType && tokenValue) {
    config.headers.Authorization = `${tokenType} ${tokenValue}`
  }
  if (!config.headers.Authorization && tenantId) {
    config.headers.tenantId = tenantId
  }
  return config
}, error => {
  return Promise.reject(error)
})

instance.interceptors.response.use(({ data, status }) => {
  const { ret, msg = Error.ApiUnknown } = data as IHttpResponse
  if (status !== 200) {
    store.dispatch('showToast', { type: 'error', message: Error.ApiUnknown })
    return Promise.reject(Error.ApiUnknown)
  }
  if (ret !== 0) {
    store.dispatch('showToast', { type: 'error', message: msg })
    return Promise.reject(msg)
  }
  return Promise.resolve(data.result)
}, error => {
  if (error.code === 'ECONNABORTED') {
    store.dispatch('showToast', { type: 'error', message: Error.NetworkTimeout })
  } else {
    store.dispatch('showToast', { type: 'error', message: Error.ApiUnknown })
  }
  return Promise.reject(error)
})

const http = (config: IHttpRequestConfig) => {
  const { apiName, query = {}, requestType } = config
  const service = services.gateway
  const api = service[apiName]
  config.url = service.domain
  if (Object.keys(query).length > 0) {
    Object.keys(query).forEach(key => {
      config.url += api.url.replace(new RegExp(`{${key}}`, 'g'), query[key])
    })
  } else {
    config.url += api.url
  }
  config.method = api.method
  if (requestType === 'form') {
    config.data = qs.stringify(config.data)
  }
  return instance.request(config)
}

export default http