import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { Form, Input, Button } from "antd"
import QueueAnim from "rc-queue-anim"
import { MehOutlined, UserOutlined, LockOutlined } from "@ant-design/icons"
import { Store } from "rc-field-form/lib/interface"
import { observer } from "mobx-react-lite"

import "./index.less"

import ChromeMethods from "@/utils/chrome_methods"
import { useStateStore } from "@/stores"
import { FormEmptyVerify } from "@/utils/formVerify"
import { registerApi, loginApi } from "@/apis"

export interface ILoginFormProps {
  formType: number // 1登陆表单，2注册表单
  onBack: (event?: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

const LoginForm: React.FC<ILoginFormProps> = ({ formType, onBack }) => {
  const history = useHistory()
  const { loading } = useStateStore()
  const [form] = Form.useForm()

  const [formState, setFormState] = useState(false)

  const handleLoadingLogin = async (val: Store) => {
    const { username, password } = val
    loginApi({ username, password })
      .then(async res => {
        await ChromeMethods.ChromeSetToken(res.data.token)
        history.push("/")
      })
      .catch(err => {})
  }

  const handleLoadingRegister = async (val: Store) => {
    const { nickname, username, password } = val
    registerApi({ nickname, username, password })
      .then(res => onBack())
      .catch(err => console.log(err))
  }

  return (
    <div className="login-form-list">
      <Form
        form={form}
        name="basic"
        colon={false}
        onChange={() => {
          setFormState(FormEmptyVerify(form.getFieldsValue()))
        }}
        onFinish={val => {
          formType === 1 ? handleLoadingLogin(val) : handleLoadingRegister(val)
        }}
      >
        <QueueAnim type="bottom">
          {formType === 2 && (
            <div key="nickname">
              <Form.Item name="nickname">
                <Input placeholder="nickname" prefix={<MehOutlined className="site-form-item-icon" />} />
              </Form.Item>
            </div>
          )}

          <div key="username">
            <Form.Item name="username">
              <Input placeholder="username" prefix={<UserOutlined className="site-form-item-icon" />} />
            </Form.Item>
          </div>

          <div key="password">
            <Form.Item name="password">
              <Input.Password placeholder="Password" prefix={<LockOutlined className="site-form-item-icon" />} autoComplete="off" />
            </Form.Item>
          </div>

          <div key="btngroup">
            <Form.Item shouldUpdate>
              {() => (
                <div className="form-btn-group">
                  <Button
                    className="btn-width"
                    type="primary"
                    loading={loading}
                    htmlType="submit"
                    disabled={!!(!formState || form.getFieldsError().filter(({ errors }) => errors.length).length)}
                  >
                    {formType === 2 ? `Submit` : `Log in`}
                  </Button>
                  <Button className="btn-width" onClick={onBack}>
                    Back
                  </Button>
                </div>
              )}
            </Form.Item>
          </div>
        </QueueAnim>
      </Form>
    </div>
  )
}

export default observer(LoginForm)
