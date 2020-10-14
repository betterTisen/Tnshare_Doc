import React, { useState } from "react"
import { useAsyncEffect } from "use-async-effect"
import { Redirect } from "react-router-dom"
import { observer } from "mobx-react-lite"

import { Menu } from "antd"
import { MenuClickEventHandler } from "rc-menu/lib/interface"

import "./index.less"

import ChromeMethods from "@/utils/chrome_methods"
import { useStateStore } from "@/stores"
import { initApi } from "@/apis"

import { Group, Share, Setting } from "@/components/main"
import { GroupIcon, SettingIcon, ShareIcon } from "@/components/icon"

const Home: React.FC = () => {
  const { token } = useStateStore()
  const [current, setCurrent] = useState("group")
  const [groupState, setGroupState] = useState<string | null>("0")
  const [settingState, setSettingState] = useState<{ nickname: string }>({ nickname: "" })
  const [tagState, setTagState] = useState<string[]>([])

  useAsyncEffect(async () => {
    ChromeMethods.ChromeGetTabIdx(tab => {
      setCurrent(tab)
    })
    await ChromeMethods.ChromeGetToken()

    const res = await initApi()
    setGroupState(res.data.group ? res.data.group.groupid : null)
    setTagState(res.data.group ? [...res.data.group.tags] : [])
    setSettingState({ nickname: res.data.nickname })
  }, [])

  // 顶部切换
  const handleCurrent: MenuClickEventHandler = ({ key }) => {
    if (key === current) return
    ChromeMethods.ChromeSetTabIdx(key, function () {
      setCurrent(key as string)
    })
  }

  // 更新组信息
  const setGroupId = (groupid: string) => {
    setGroupState(groupid)
  }

  return (
    <div className="main-container">
      <Menu className="menu-cls" onClick={handleCurrent} selectedKeys={[current]} mode="horizontal">
        <Menu.Item style={current === "group" ? {} : { filter: `grayscale(100%)` }} icon={<GroupIcon />} key="group"></Menu.Item>
        <Menu.Item
          disabled={!groupState}
          style={current === "share" ? {} : { filter: `grayscale(100%)` }}
          icon={<ShareIcon />}
          key="share"
        ></Menu.Item>
        <Menu.Item style={current === "setting" ? {} : { filter: `grayscale(100%)` }} icon={<SettingIcon />} key="setting"></Menu.Item>
      </Menu>

      <div className="content">
        {current === "group" && <Group group={{ groupid: groupState, setGroupId: setGroupId }} />}
        {current === "share" && <Share tags={tagState} nickname={settingState.nickname} groupid={groupState} />}
        {current === "setting" && <Setting info={settingState} />}
      </div>
      {!token && <Redirect to="/login" />}
    </div>
  )
}

export default observer(Home)
