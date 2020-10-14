import React from "react"
import Lottie from "lottie-react-web"
import animationData from "@/images/lordicon/share.json"

const ShareIcon: React.FC = () => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  }
  return (
    <div>
      <Lottie options={defaultOptions} height={40} width={40} speed={1} />
    </div>
  )
}

export default ShareIcon
