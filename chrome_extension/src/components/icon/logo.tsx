import React from "react"
import Lottie from "lottie-react-web"
import animationData from "@/images/lordicon/icon.json"

const Logo: React.FC = () => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  }
  return <Lottie options={defaultOptions} height={80} width={80} speed={1} />
}

export default Logo
