import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import mixpanel from 'mixpanel-browser'
import '../App.css'

import startScreen from "../assets/dive_start_screen.png"
import endScreen from "../assets/dive_end_screen.png"
import BackgroundVideo from "./BackgroundVideo"
import diveVideo from "../assets/aloom_dive.mp4"
import TransitionButton from "./TransitionButton"
import BackToSurfaceButton from "./BackToSurfaceButton"
import staticFrame from "../assets/aloom_cross_roads_static.jpeg"

const CrossRoads = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const companyBtnRef = useRef<HTMLDivElement>(null)
  const productBtnRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)
  const [containerImage, setContainerImage] = useState(startScreen)
  const history = useHistory()

  const fadeContentOutTo = (location: string) => {
    const companyBtn = companyBtnRef!.current!
    const productBtn = productBtnRef!.current!
    const content = contentRef!.current!
    const contentBackground = containerRef!.current!

    contentBackground.classList.remove("glow-effect")

    companyBtn.style.opacity = "0.0"
    productBtn.style.opacity = "0.0"
    content.style.opacity = "0.0"

    setTimeout(() => {
      history.push(location)
    },600)
  }

  const fadeContentIn = () => {
    const companyBtn = companyBtnRef!.current!
    const productBtn = productBtnRef!.current!
    const content = contentRef!.current!
    const contentBackground = containerRef!.current!

    companyBtn.style.transition = "opacity 600ms linear"
    productBtn.style.transition = "opacity 600ms linear"
    content.style.transition = "opacity 600ms linear"
    companyBtn.style.opacity = "0.6"
    productBtn.style.opacity = "0.6"
    content.style.opacity = "1.0"

    companyBtn.className = "hover-up-effect"
    productBtn.className = "hover-down-effect"
    contentBackground.className += " glow-effect"

    mixpanel.track("viewed cross roads")
  }

  const startContentAnimation = () => {
    setContainerImage(endScreen)
    setTimeout(fadeContentIn, 300)

    videoRef!.current!.style.transition = "opacity 1s linear"
    videoRef!.current!.style.opacity = "0.0"

  }
  const listenForVideoEnd = () => {
    const id = setInterval(() => {
      if (videoRef.current && videoRef.current.ended) {
        startContentAnimation()
        clearInterval(id)
      }
    }, 10)
  }

  return (
    <Container ref={containerRef} imageUrl={containerImage}>
      <BackgroundVideo
        ref={videoRef}
        src={diveVideo}
        onLoadedData={() => {
          videoRef!.current!.play()
          listenForVideoEnd()
          setTimeout(() => {
            imgRef.current!.style.display = "none"
            videoRef.current!.play()
          }, 120)
        }}
        scale={0.8}
      />
      <Image ref={imgRef} imageUrl={staticFrame} />
      <BackToSurfaceButton />
      <ContentLayer ref={contentRef}>
        <TransitionButton
          ref={companyBtnRef}
          onClick={() => {
            mixpanel.track("clicked company");
            fadeContentOutTo("company")
          }}
        >Company</TransitionButton>

        <PWrapper>
          <p className="contentBlockP" style={{margin: "20px 0px"}}>
            aloom makes multimedia immersive.
          </p>
          <p className="contentBlockP" style={{opacity: 0.8, margin: "20px 0px"}}>
            Our lights are a content platform that simply engage remote audiences better.
          </p>
          <p className="contentBlockP" style={{opacity: 0.6, margin: "20px 0px"}}>
            We merge digital experiences with the home.
          </p>
        </PWrapper> 

        <TransitionButton
          ref={productBtnRef}
          bottom
          onClick={() => {
            mixpanel.track("clicked product");
            fadeContentOutTo("product")
          }}
        >Product</TransitionButton> 
      </ContentLayer>
    </Container>
  )
}

interface ContainerProps {
  imageUrl: string
}
const Container = styled.div<ContainerProps>`
  background-image: url(${props => props.imageUrl});
  background-position: center;
  background-size: 1920px 1180px;
  background-repeat: no-repeat;
  width: 100vw;
  height: 100vh;
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
const ContentLayer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  opacity: 0.0;
  display: grid;
  justify-items: center;
  align-items: center;
`
const PWrapper = styled.div`
  color: white;
  font-size: 28px;
  font-weight: 600;
  box-sizing: border-box;
  padding: 40px;
`

export default CrossRoads