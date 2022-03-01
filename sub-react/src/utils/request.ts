import axios,{AxiosRequestConfig,AxiosResponse} from 'axios'

const service = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
  timeout: 30000 // request timeout
})

service.interceptors.request.use(
  (config:AxiosRequestConfig) => {
    // 配置token等请求头信息
    const token = localStorage.token
    if (token) {
      //...
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)
// respone拦截器
service.interceptors.response.use(
  (res:AxiosResponse) => {
    return res.data
  },
  error => {
    console.log('err' + error)
    return Promise.reject(error)
  }
)


// config.ignore: 忽略请求错误提示
export default service
