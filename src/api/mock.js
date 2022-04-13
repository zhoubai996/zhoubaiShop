import axios from 'axios'
//request就是axios,只不过request多了配置项
const request = axios.create({
  baseURL: '/mock',
  // 超时时间
  timeout: 5000,
})
// 请求拦截器： 在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
request.interceptors.request.use((config) => {
  //config对象，里面有个属性很重要，headers请求头
  return config
})
request.interceptors.response.use(
  (res) => {
    //成功的回调，服务器数据回来后，相应拦截器可以检测到，做一些事情
    return res.data
  },
  (error) => {
    return Promise.reject(new Error(error))
  }
)
export default request
