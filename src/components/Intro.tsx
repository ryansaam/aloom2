import React, { useRef } from 'react'

import BackgroundVideo from "./BackgroundVideo"
import DiveVideo from "../assets/aloom_dive.mp4"
import LandingPage from "./LandingPage"

interface IntroProps {
  startTransition: () => void
  handleScroll: () => void
}
const Intro = ({ startTransition, handleScroll }: IntroProps) => {
  const landingPageContainerRef = useRef<HTMLDivElement>(null)
  const diveVideoRef = useRef<HTMLVideoElement>(null)

  const listenForVideoEnd = () => {
    const id = setInterval(() => {
      const vid = diveVideoRef!.current!
      if (vid.currentTime === vid.duration) {
        startTransition()
        clearInterval(id)
      }
    }, 10)
  }

  return (
    <div style={{
      width: "100%",
      height: "100%",
      position: "absolute",
      top: "0px",
      left: "0px"
    }} >
      <div style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: "0px",
        left: "0px"
      }} >
        <BackgroundVideo scale={0.8} ref={diveVideoRef} src={DiveVideo} onLoadedData={() => {}} />
      </div>
      <div ref={landingPageContainerRef} style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: "0px",
        left: "0px"
      }} >
        <LandingPage startTransition={() => {
          handleScroll()
          landingPageContainerRef!.current!.style.display = "none"
          diveVideoRef!.current!.play()
          listenForVideoEnd()
          console.log(diveVideoRef!.current!.duration)
          setTimeout(() => {
            diveVideoRef!.current!.style.opacity = "0.0"
          }, 6.101333 * 1000)
        }} />
      </div>
    </div>
  )
}

export default Intro