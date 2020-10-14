import React from "react"
import Lottie from "lottie-react-web"
import animationData from "@/images/lordicon/no-group.json"

const NoGroupIcon: React.FC = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  }
  return <Lottie options={defaultOptions} height={200} width={200} speed={1} />
}

export default NoGroupIcon
