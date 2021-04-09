import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import '../App.css'

import BackgroundVideo from "./BackgroundVideo"
import diveVideo from "../assets/aloom_dive.mp4"
import aloomVideo from "../assets/aloom_landing_page_large.mp4"
import staticFrame from "../assets/aloom_landing_page_large_static.jpeg"

const AloomLoop = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const aloomVideoRef = useRef<HTMLVideoElement>(null)
  const diveVideoRef = useRef<HTMLVideoElement>(null)
  const helperRef = useRef<HTMLDivElement>(null)
  const aloomTransitionWrapper = useRef<HTMLDivElement>(null)
  const diveTransitionWrapper = useRef<HTMLDivElement>(null)
  const [backgroundImage, setBackgroundImage] = useState<string | null>(staticFrame)
  const history = useHistory()

  const listenForClickOrScroll = () => {
    const listenForVideoEnd = () => {
      const id = setInterval(() => {
        if (aloomVideoRef!.current!.ended) {
          aloomTransitionWrapper.current!.style.visibility = "hidden"
          diveVideoRef.current!.play()
          clearInterval(id)
        }
      }, 10)
    }

    function onScroll() {
      aloomVideoRef!.current!.loop = false
      listenForVideoEnd()

      helperRef!.current!.style.transition = "opacity linear 300ms"
      helperRef!.current!.style.opacity = "0.0"

      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("click", onClick)
    }
    function onClick() {
      aloomVideoRef!.current!.loop = false
      listenForVideoEnd()

      helperRef!.current!.style.transition = "opacity linear 300ms"
      helperRef!.current!.style.opacity = "0.0"

      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("click", onClick)
    }

    window.addEventListener("scroll", onScroll)
    window.addEventListener("click", onClick)
  }

  const listenForVideoEnd = () => {
    const id = setInterval(() => {
      if (diveVideoRef.current && diveVideoRef.current.ended) {
        history.push("cross-roads")
        clearInterval(id)
      }
    }, 10)
  }

  return (
    <Container ref={containerRef} imageUrl={backgroundImage} bgWidth={1920} bgHeight={1440} bgScale={0.8}>
      <TransitionVideoWrapper ref={diveTransitionWrapper}>
        <BackgroundVideo
          ref={diveVideoRef}
          src={diveVideo}
          onLoadedData={() => {
            setTimeout(() => {
              diveTransitionWrapper.current!.style.visibility = "visible"
              setBackgroundImage(null)
              listenForVideoEnd()
            }, 120)
          }}
          scale={0.8}
        />
      </TransitionVideoWrapper>
      <TransitionVideoWrapper ref={aloomTransitionWrapper}>
        <BackgroundVideo
          ref={aloomVideoRef}
          src={aloomVideo}
          onLoadedData={() => {
            listenForClickOrScroll()
            setTimeout(() => {
              aloomTransitionWrapper.current!.style.visibility = "visible"
              aloomVideoRef.current!.loop = true
              aloomVideoRef.current!.play()
            }, 60)
          }}
          scale={0.8}
        />
      </TransitionVideoWrapper>
      <div ref={helperRef} className="bounce-effect" style={{
        backgroundColor: "black",
        borderRadius: "30px",
        padding: "6px 12px",
        position: "absolute",
        left: "50%",
        marginLeft: "-60px",
        bottom: "0px",
        marginBottom: "60px",
        zIndex: 20
      }}>
        <span style={{
          color: "white",
          fontSize: "20px",
          fontWeight: 600,
          letterSpacing: "4px"
        }}>Dive In!</span>
      </div>
    </Container>
  )
}

interface ContainerProps {
  imageUrl: string | null
  bgWidth: number
  bgHeight: number
  bgScale: number
}
const Container = styled.div<ContainerProps>`
  background-image: url(${props => props.imageUrl || null});
  background-position: center;
  background-size: ${props => props.bgWidth * props.bgScale}px ${props => props.bgHeight * props.bgScale}px;
  background-repeat: no-repeat;
  background-color: black;
  width: 100vw;
  height: calc(100vh + 1px);
  position: relative;
`
const TransitionVideoWrapper = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 6;
  visibility: hidden;
`

export default AloomLoop