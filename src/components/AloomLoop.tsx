import React, { useRef } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import '../App.css'

import BackgroundVideo from "./BackgroundVideo"
import diveVideo from "../assets/aloom_landing_page_large.mp4"

const AloomLoop = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)
  const helperRef = useRef<HTMLDivElement>(null)
  const history = useHistory()

  const listenForClickOrScroll = () => {
    const listenForVideoEnd = () => {
      const id = setInterval(() => {
        if (videoRef!.current!.ended) {
          history.push("cross-roads")
          clearInterval(id)
        }
      }, 10)
    }

    function onScroll() {
      videoRef!.current!.loop = false
      listenForVideoEnd()

      helperRef!.current!.style.transition = "opacity linear 300ms"
      helperRef!.current!.style.opacity = "0.0"

      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("click", onClick)
    }
    function onClick() {
      videoRef!.current!.loop = false
      listenForVideoEnd()

      helperRef!.current!.style.transition = "opacity linear 300ms"
      helperRef!.current!.style.opacity = "0.0"

      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("click", onClick)
    }

    window.addEventListener("scroll", onScroll)
    window.addEventListener("click", onClick)
  }

  return (
    <Container ref={containerRef}>
      <BackgroundVideo
        ref={videoRef}
        src={diveVideo}
        onLoadedData={() => {
          listenForClickOrScroll()
          setTimeout(() => {
            imgRef.current!.style.display = "none"
            videoRef.current!.loop = true
            videoRef.current!.autoplay = true
            videoRef.current!.play()
          }, 60)
        }}
        scale={0.8}
      />
        <div ref={helperRef} className="bounce-effect" style={{
          backgroundColor: "black",
          borderRadius: "30px",
          padding: "6px 12px",
          position: "absolute",
          left: "50%",
          marginLeft: "-60px",
          bottom: "0px",
          marginBottom: "60px"
        }}>
          <span style={{
            color: "white",
            fontSize: "20px",
            fontWeight: 600,
            letterSpacing: "4px"
          }}>Dive In!</span>
        </div>
      <Image ref={imgRef} />
    </Container>
  )
}

interface ContainerProps {
  imageUrl?: string
}
const Container = styled.div<ContainerProps>`
  background-image: url(${props => props.imageUrl || null});
  background-position: center;
  background-size: 1920px 1180px;
  background-repeat: no-repeat;
  width: 100vw;
  height: calc(100vh + 1px);
  position: relative;
`

interface ImageProps {
  imageUrl?: string
}
const Image = styled.div<ImageProps>`
  background-image: url(${props => props.imageUrl || null});
  background-position: center;
  background-repeat: no-repeat;
  background-color: black;
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0px;
  left: 0px;
`

export default AloomLoop