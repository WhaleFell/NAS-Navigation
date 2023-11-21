import axios from 'axios'
import { AxiosResponse } from 'axios'
import { NoticeType, useNotice } from './notice'
import {
  InternalAxiosRequestConfig,
  AxiosError,
} from 'axios'

const request = axios.create({
  baseURL: '/',
  timeout: 5000,
})

// 添加请求拦截器
request.interceptors.request.use(
  (axiosConfig: InternalAxiosRequestConfig) => {
    // 在发送请求之前做些什么
    // if (config.debug.value) {
    //   useNotice(
    //     'Response',
    //     `url:${axiosConfig.url}`,
    //     NoticeType.INFO,
    //   )
    // }
    return axiosConfig
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  },
)

// 添加响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse) => {
    // 对响应数据做点什么
    // 成功响应数据
    // if (config.debug.value) {
    //   useNotice(
    //     'Response',
    //     `url:${response.config.url}`,
    //     NoticeType.SUCCESS,
    //   )
    // }
    return response
  },
  (error: AxiosError) => {
    console.log(error)
    if (error.response) {
      // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
      useNotice(
        `Response ERROR ${error.code}`,
        `${error.config?.url}\n${error.response.data}`,
        NoticeType.WARNING,
      )
    } else if (error.request) {
      // 请求已经成功发起，但没有收到响应
      // `error.request` 在浏览器中是 XMLHttpRequest 的实例，
      // 而在node.js中是 http.ClientRequest 的实例
      useNotice(
        `Response ERROR`,
        `${error.config?.url}\n${error}`,
        NoticeType.ERROR,
      )
    } else {
      useNotice(
        `Response ERROR`,
        `${error.config?.url}\nunknow http request error:${error}`,
        NoticeType.ERROR,
      )
    }
    return Promise.reject(error)
  },
)

export default request
