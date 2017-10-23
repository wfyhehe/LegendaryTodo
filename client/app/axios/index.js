import axios from 'axios';
import local from '../utils/localStore'
import {TOKEN} from '../constants/localStorage';
import {message} from 'antd';
import {} from 'react-router-dom'
axios.interceptors.request.use(config => {
  const token = local.getItem(TOKEN)
  if (token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
    config.headers.Authorization = ` Token ${token}`
  }
  return config
}, error => {
  //Do something with request error
  return Promise.reject(error)
})

axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error && error.response) {
      switch (error.response.status) {
      case 400:
        error.message = '请求错误'
        const data = error.response.data
        for (let key in data) {
          message.error(`${key}错误: ${data[key]}`)
        }
        break
      case 401:
        error.message = '身份未验证，请先登录'
        window.history.push('/user/sign-in')
        break
      case 403:
        error.message = '抱歉，您的权限不足！'
        break
      case 404:
        error.message = `请求地址出错: ${error.response.config.url}`
        break
      case 408:
        error.message = '请求超时'
        break
      case 500:
        error.message = '服务器内部错误'
        break
      case 501:
        error.message = '服务未实现'
        break
      case 502:
        error.message = '网关错误'
        break
      case 503:
        error.message = '服务不可用'
        break
      case 504:
        error.message = '网关超时'
        break
      case 505:
        error.message = 'HTTP版本不受支持'
        break
      default:
      }
    }
    return Promise.reject(error)
  })

export default axios