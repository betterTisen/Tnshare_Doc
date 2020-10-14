import axios, { Method } from "axios"
import { message } from "antd"

import ENV from "@/configs/env"
import ChormeMethods from "@/utils/chrome_methods"
import { stores } from "@/stores/index"

export const loadKey = "updatable"

let loadMsgState = true

const instance = axios.create({
  baseURL: ENV.BASE_URL,
  timeout: 10000,
  headers: {
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Origin": "*",
  },
})

instance.defaults.headers.get["Content-Type"] = "application/json;charset=UTF-8;"
instance.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8;"

/** 请求拦截器 **/
instance.interceptors.request.use(
  config => {
    stores.stateStore.handleSetLoading(true)
    loadMsgState && message.loading({ content: "Loading...", key: loadKey, duration: 10 })
    config.headers["Authorization"] = stores.stateStore.token ? "Bearer " + stores.stateStore.token : ""
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
/** 响应拦截器  **/
instance.interceptors.response.use(
  response => {
    stores.stateStore.handleSetLoading(false)
    if (response.data.code === 200) {
      loadMsgState && message.success({ content: response.data.message, key: loadKey, duration: 1 })
      return Promise.resolve(response.data)
    } else {
      loadMsgState && message.error({ content: response.data.message, key: loadKey, duration: 1 })
      return Promise.reject(response.data.message)
    }
  },
  error => {
    stores.stateStore.handleSetLoading(false)
    if (!error.response) {
      loadMsgState && message.error({ content: "Request Timeout!", key: loadKey, duration: 1 })
      return Promise.reject(new Error("Request Timeout!"))
    } else if (error.response.data.code === 401) {
      ChormeMethods.ChromeSetToken("")
      loadMsgState && message.error({ content: error.response.data.message, key: loadKey, duration: 1 })
      return Promise.reject(error.response.data.message)
    } else {
      loadMsgState &&
        message.error({ content: error.response.data.message ? error.response.data.message : "Network Error!", key: loadKey, duration: 1 })
      return Promise.reject(error)
    }
  }
)

export interface IHttpProps {
  (params: any, url: string, method: Method, msgState: boolean): Promise<any>
}

const http: IHttpProps = (params, url, method, msgState) => {
  loadMsgState = msgState
  return instance({
    url,
    method,
    [method === "get" ? "params" : "data"]: params,
  })
}

export default http
