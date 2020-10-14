import React from "react"
import { message, Button, Avatar } from "antd"
import { Link } from "react-router-dom"
import QueueAnim from "rc-queue-anim"

import "./index.less"

import ChromeMethods from "@/utils/chrome_methods"
import { SettingAniIcon } from "@/components/icon"

const Setting: React.FC<{ info: { nickname: string } }> = ({ info }) => {
  const handleLogout = async () => {
    await ChromeMethods.ChromeSetToken("")
    ChromeMethods.ChromeSetTabIdx("group", () => {})
    message.success({ content: "Logout Successfully", duration: 1 })
  }

  return (
    <div className="setting-cls">
      <div className="setting-p">
        <QueueAnim className="user-info">
          <div key="head">
            <Avatar size={50} style={{ color: "#fff", backgroundColor: "rgb(28 144 255 / 0.6)" }}>
              {info.nickname.substring(0, 1)}
            </Avatar>
          </div>
          <div key="nickname" className="nick-name">
            {info.nickname}
          </div>
        </QueueAnim>
        <QueueAnim className="setting-btn" type="bottom">
          <div key="btn">
            <Button block type="primary">
              <Link onClick={handleLogout} to="/login">
                Logout
              </Link>
            </Button>
          </div>
        </QueueAnim>
      </div>
      <SettingAniIcon />
    </div>
  )
}

export default Setting
