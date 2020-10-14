import React, { useState } from "react"
import { Button, Modal, Input } from "antd"
import QueueAnim from "rc-queue-anim"

import "./index.less"

import ENV from "@/configs/env"
import { useStateStore } from "@/stores"
import { HasGroupIcon, NoGroupIcon } from "@/components/icon"
import { createGroupApi, joinGroupApi } from "@/apis"

const Group: React.FC<{ group: { groupid: string | null; setGroupId: (groupid: string) => void } }> = ({ group }) => {
  const [inputValue, setInputValue] = useState("")
  const [joinDialogState, setJoinDialogState] = useState(false)
  const { token } = useStateStore()

  // 弹窗确认
  const handleDialogOk = async () => {
    const res = await joinGroupApi({ groupid: inputValue })
    group.setGroupId(res.data.groupid)
    setJoinDialogState(false)
  }
  // 弹窗关闭
  const handleDlalogCancel = () => {
    setJoinDialogState(false)
  }

  // 打开后台
  const handleLinkedAdmin = () => {
    window.open(`${ENV.ADMIN_URL}/${group.groupid}/${token}`)
  }

  const handleCreateGroup = async () => {
    const res = await createGroupApi({})
    group.setGroupId(res.data.groupid)
  }

  const handleJoinGroup = () => {
    setJoinDialogState(true)
  }

  return (
    <div className="group-cls">
      {!group.groupid ? (
        <div className="no-group">
          <NoGroupIcon />
          <span className="title">You didn't join any group</span>
          <Button type="primary" style={{ marginBottom: "10px" }} onClick={handleCreateGroup}>
            Create Group
          </Button>
          <Button onClick={handleJoinGroup}>Join Group</Button>
          <Modal closable={false} visible={joinDialogState} onOk={handleDialogOk} onCancel={handleDlalogCancel}>
            <Input
              value={inputValue}
              onChange={e => {
                setInputValue(e.target.value)
              }}
              placeholder="Please input group id..."
            />
          </Modal>
        </div>
      ) : (
        <QueueAnim className="has-group" type="bottom">
          <HasGroupIcon />
          <div key="title" className="title">
            Your Group ID:<b>{group.groupid}</b>
          </div>
          <div key="btn">
            <Button block style={{ marginTop: "10px" }} type="primary" onClick={handleLinkedAdmin}>
              Linked To Admin Page
            </Button>
          </div>
        </QueueAnim>
      )}
    </div>
  )
}

export default Group
