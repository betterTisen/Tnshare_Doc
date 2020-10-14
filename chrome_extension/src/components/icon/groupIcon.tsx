import React from "react"
import Lottie from "lottie-react-web"
import animationData from "@/images/lordicon/group.json"

const GroupIcon: React.FC = () => {
  const defaultOptions = {
    loop: false,
    autoplay: false,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  }
  return (
    <div style={{ transform: "scale(0.8)" }}>
      <Lottie options={defaultOptions} height={40} width={40} speed={1.3} />
    </div>
  )
}

export default GroupIcon
