import React from "react"

import { stores } from "@/stores/index"

export interface IChromeMethodsProps {
  ChromeTabsQuery: (cb: Function) => void // 获取外部链接
  ChromeSetTabIdx: (key: React.Key, cb: Function) => void // 设置tab选项卡点击位置
  ChromeGetTabIdx: (cb: (tab: string) => void) => void // 获取tab选项卡点击位置
  ChromeSetToken: (token: string) => Promise<string> // 设置token
  ChromeGetToken: () => Promise<string> // 获取token
}

const dev_methods: IChromeMethodsProps = {
  ChromeTabsQuery: cb => {
    cb({
      title: "i m title",
      link: "i m link",
      description: "im description",
    })
  },
  ChromeSetTabIdx: (key, cb) => {
    cb()
  },
  ChromeGetTabIdx: cb => {
    cb("group")
  },
  ChromeSetToken: token => {
    return new Promise(resolve => {
      localStorage.setItem("token", token)
      stores.stateStore.handleSetToken(token)
      resolve(token)
    })
  },
  ChromeGetToken: () => {
    return new Promise(resolve => {
      const token = localStorage.getItem("token") || ""
      stores.stateStore.handleSetToken(token)
      resolve(token)
    })
  },
}

const prod_methods: IChromeMethodsProps = {
  ChromeTabsQuery(cb) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id as number, { action: "GET_PAGE_DATA" }, function (response) {
        cb(response)
      })
    })
  },
  ChromeSetTabIdx: (key, cb) => {
    chrome.storage.local.set({ tab: key }, function () {
      cb()
    })
  },
  ChromeGetTabIdx: cb => {
    chrome.storage.local.get(["tab"], function (res) {
      cb(res.tab ? res.tab : "group")
    })
  },
  ChromeSetToken: token => {
    return new Promise(resolve => {
      chrome.storage.local.set({ token }, function () {
        stores.stateStore.handleSetToken(token)
        resolve(token)
      })
    })
  },
  ChromeGetToken: () => {
    return new Promise(resolve => {
      chrome.storage.local.get(["token"], function (res) {
        const token = res ? res.token : ""
        stores.stateStore.handleSetToken(token)
        resolve(token)
      })
    })
  },
}

const Methods = process.env.REACT_APP_ENV === "dev" ? dev_methods : prod_methods

export default {
  ...Methods,
}
