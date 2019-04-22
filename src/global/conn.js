import axios from 'axios'
import router from '../router'
import ls from '../utils/lsUtils'

// 创建axios实例
const axiosInstance = axios.create({
  baseURL: '',
  headers: {
    'Content-type': 'application/json'
  },
  timeout: 0 // 请求超时时间
})

// 注册请求拦截器
axiosInstance.interceptors.request.use((config) => {
  config.headers.token = ls.get('token')
  const { ...data } = config.data
  if (config.method === 'get') {
    config.params = data // get请求参数必须为params: {}
  } else {
    config.data = data // data: {}只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
  }
  return config
})

// 注册响应拦截器
axiosInstance.interceptors.response.use((response) => {
  // 统一处理返回值
  if (response.data.code === 200) {
    return Promise.resolve(response.data)
  } else {
    if (response.data.code === 401 || response.data.code === 403) {
      router.push('/login')
    }
    return Promise.reject({ code: response.data.code, msg: response.data.msg })
  }
}, (error) => {
  return error
})

export default axiosInstance
