import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import mixpanel from 'mixpanel-browser'
import '../App.css'

import endScreen from "../assets/dive_end_screen.jpeg"
import TransitionButton from "./TransitionButton"
import BackToSurfaceButton from "./BackToSurfaceButton"
import {
  Page,
  trackClickedCompany,
  trackClickedProduct,
  trackCrossRoadsView,
  trackClickedBackToSurface
} from "./mixpanelAPI"

const CrossRoads = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const companyBtnRef = useRef<HTMLDivElement>(null)
  const productBtnRef = useRef<HTMLDivElement>(null)
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

    companyBtn.style.transition = "opacity 2s linear"
    productBtn.style.transition = "opacity 2s linear"
    content.style.transition = "opacity 2s linear"
    companyBtn.style.opacity = "0.6"
    productBtn.style.opacity = "0.6"
    content.style.opacity = "1.0"

    setTimeout(() => {
      companyBtn.className = "hover-up-effect"
      productBtn.className = "hover-down-effect"
      contentBackground.className += " glow-effect"
    }, 2000)

    mixpanel.track("viewed cross roads")
  }

  useEffect(() => {
    trackCrossRoadsView()
    fadeContentIn()
  }, [])

  return (
    <Container ref={containerRef} bgWidth={1920} bgHeight={1440} bgScale={0.8} imageUrl={endScreen}>
      <BackToSurfaceButton onClick={() => { trackClickedBackToSurface(Page.CrossRoads) }} />
      <ContentLayer ref={contentRef}>
        <TransitionButton
          ref={companyBtnRef}
          padding
          onClick={() => {
            trackClickedCompany()
            fadeContentOutTo("company")
          }}
        >Company</TransitionButton>

        <PWrapper>
          <p className="contentBlockP" style={{margin: "20px 0px"}}>
            aloom makes multimedia immersive.
          </p>
          <p className="contentBlockP" style={{opacity: 0.8, margin: "20px 0px"}}>
            Our lights are a content platform that engage remote audiences better.
          </p>
          <p className="contentBlockP" style={{opacity: 0.6, margin: "20px 0px"}}>
            We merge digital experiences with the home.
          </p>
        </PWrapper> 

        <TransitionButton
          ref={productBtnRef}
          bottom
          onClick={() => {
            trackClickedProduct()
            fadeContentOutTo("product")
          }}
        >Product</TransitionButton> 
      </ContentLayer>
    </Container>
  )
}

interface ContainerProps {
  imageUrl: string
  bgWidth: number
  bgHeight: number
  bgScale: number
}
const Container = styled.div<ContainerProps>`
  background-image: url(${props => props.imageUrl});
  background-position: center;
  background-size: ${props => props.bgWidth * props.bgScale}px ${props => props.bgHeight * props.bgScale}px;
  background-repeat: no-repeat;
  width: 100vw;
  height: calc(100vh + 1px);
  position: relative;
`
const ContentLayer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  opacity: 0.0;
  display: grid;
  grid-template-rows: 100px auto 100px;
  justify-items: center;
  align-items: center;
  z-index: 20;
`
const PWrapper = styled.div`
  color: white;
  font-size: 28px;
  font-weight: 600;
  box-sizing: border-box;
  padding: 40px;
`

export default CrossRoads