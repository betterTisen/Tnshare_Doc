import React, { useEffect } from "react"
import { Form, Input, Button, Select, message } from "antd"
import QueueAnim from "rc-queue-anim"
import { observer } from "mobx-react-lite"
import { Store } from "rc-field-form/lib/interface"

import "./index.less"

import ChromeMethods from "@/utils/chrome_methods"
import { useStateStore } from "@/stores"
import { FormEmptyVerify } from "@/utils/formVerify"
import { addArticleApi } from "@/apis"

export interface TChromeTabsQueryRes {
  title: string
  link: string
  description: string
}

const Share: React.FC<{ tags: string[]; nickname: string; groupid: string | null }> = ({ tags, nickname, groupid }) => {
  const { loading } = useStateStore()
  const [form] = Form.useForm()

  useEffect(() => {
    ChromeMethods.ChromeTabsQuery((res: TChromeTabsQueryRes) => {
      if (!res) return
      form.setFieldsValue({ ...res, tag: "Default" })
    })
  }, [form])

  const handleSubmitArticle = (val: Store) => {
    if (!FormEmptyVerify(form.getFieldsValue())) {
      message.error({ content: "Please fill in all the information!", duration: 1 })
      return
    }
    addArticleApi({ ...(val as { title: string; description: string; link: string; tag: string }), nickname, groupid }).then(res => {
      console.log(res)
    })
    form.resetFields()
    form.setFieldsValue({ tag: "Default" })
  }

  return (
    <div className="share-cls">
      <Form
        initialValues={{
          title: "",
          link: "",
          description: "",
        }}
        form={form}
        name="article"
        layout="vertical"
        colon={false}
        onFinish={val => {
          handleSubmitArticle(val)
        }}
      >
        <QueueAnim type="bottom">
          <div key="title">
            <Form.Item label="⌾ Article Title" name="title">
              <Input allowClear={true} placeholder="please input title" />
            </Form.Item>
          </div>

          <div key="description">
            <Form.Item label="⌾ Article Description" name="description">
              <Input.TextArea rows={3} allowClear={true} placeholder="please input description" />
            </Form.Item>
          </div>

          <div key="link">
            <Form.Item label="⌾ Article Link" name="link">
              <Input allowClear={true} placeholder="please input link" />
            </Form.Item>
          </div>
          <div key="btngroup" className="submit-group">
            <Form.Item label="⌾ Tag" name="tag">
              <Select style={{ width: 110 }}>
                {tags.map((v, i) => (
                  <Select.Option key={i} value={v}>
                    {v}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item shouldUpdate>
              <Button style={{ width: 170 }} type="primary" loading={loading} htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </div>
        </QueueAnim>
      </Form>
    </div>
  )
}

export default observer(Share)
