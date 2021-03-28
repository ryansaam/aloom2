import React, { useEffect, useRef } from 'react'

import BackgroundVideo from "./BackgroundVideo"
import largeLandingPageVideo from "../assets/aloom_landing_page_large.mp4"

interface LandingPageProps {
  startTransition: () => void
}
const LandingPage = ({ startTransition }: LandingPageProps) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const helperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollHandler = () => {
      console.log("scroll hit")
      const vid = videoRef!.current!
      vid.loop = false

      helperRef!.current!.style.transition = "opacity linear 300ms"
      helperRef!.current!.style.opacity = "0.0"

      const id = setInterval(() => {
        if (vid.currentTime === vid.duration) {
          startTransition()
          clearInterval(id)
        }
      }, 10)

      window.removeEventListener("scroll", scrollHandler)
    }

    setTimeout(() => window.addEventListener("scroll", scrollHandler), 1000)
    
  }, [])

  return (
    <div style={{
      width: "100%",
      height: "100%",
      position: "relative"
    }}>
      <BackgroundVideo ref={videoRef} autoPlay loop src={largeLandingPageVideo} onLoadedData={() => {}} />
      <div ref={helperRef} style={{
        position: "absolute",
        top: "0px",
        left: "0px",
        width: "100%",
        height: "100%",
        display: "grid",
        justifyItems: "center",
        alignItems: "end"
      }}>
        <div className="bounce-effect" style={{
          backgroundColor: "black",
          borderRadius: "30px",
          display: "table",
          padding: "10px 16px",
          marginBottom: "40px"
        }}>
          <span style={{
            color: "white",
            fontSize: "24px",
            fontWeight: 600,
            letterSpacing: "4px"
          }}>Scroll Down</span>
        </div>
      </div>
    </div>
  )
}

export default LandingPage

