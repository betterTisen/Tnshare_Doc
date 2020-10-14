import React, { useState } from "react"
import { Button } from "antd"
import QueueAnim from "rc-queue-anim"

import "./index.less"

import { Logo } from "@/components/icon"
import LoginForm from "@/components/loginForm"

const Login: React.FC = () => {
  const [loginState, setLoginState] = useState(0) // 0默认，1登陆表单，2注册表单

  const handleShowDefaultBtn = () => {
    setLoginState(0)
  }
  const handleShowLoginCmp = () => {
    setLoginState(1)
  }
  const handleShowRegisterCmp = () => {
    setLoginState(2)
  }

  return (
    <div className="login-container">
      {/* logo */}
      <QueueAnim type={"scale"}>
        <div key="logo" className="logo">
          <div style={{ transform: "scale(2.9)" }}>
            <Logo />
          </div>
          <span>Tnshare</span>
        </div>
      </QueueAnim>

      {/* register btn & login btn */}
      {loginState === 0 && (
        <QueueAnim component="div" type={"bottom"} className="login-btn-group">
          <div key="btn1" className="btn-top">
            <Button onClick={handleShowLoginCmp} size="large" type="primary" block>
              Log in
            </Button>
          </div>
          <div key="btn2">
            <Button onClick={handleShowRegisterCmp} size="large" block>
              Register
            </Button>
          </div>
        </QueueAnim>
      )}
      {/* register & login components */}
      {loginState !== 0 && <LoginForm formType={loginState} onBack={handleShowDefaultBtn} />}
    </div>
  )
}

export default Login
