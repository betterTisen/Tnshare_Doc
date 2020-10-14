import React from "react"
import Lottie from "lottie-react-web"
import animationData from "@/images/lordicon/setting.json"

const SettingIcon: React.FC = () => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  }
  return (
    <div style={{ transform: "scale(0.8)" }}>
      <Lottie options={defaultOptions} height={40} width={40} speed={2} />
    </div>
  )
}

export default SettingIcon
